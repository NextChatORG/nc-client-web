import { SEND_PRIVATE_MESSAGE_MUTATION } from '@nc-core/api';
import { useAuth, useMessages, useMutation } from '@nc-core/hooks';
import {
  ObjectId,
  SendPrivateMessageResponse,
  SendPrivateMessageVariables,
  User,
} from '@nc-core/interfaces/api';
import { useRef, useState } from 'react';

interface ChatFooterProps {
  chatId: ObjectId;
  user: User;
}

export default function ChatFooter({
  chatId,
  user,
}: ChatFooterProps): JSX.Element {
  const [messageContent, setMessageContent] = useState<string>('');

  const messagesInputRef = useRef<HTMLInputElement | null>(null);

  const { loadRecentChats, readAllMessages } = useMessages();
  const { data: meData } = useAuth();

  const [sendPrivateMessage, { loading: sendingPrivateMessage }] = useMutation<
    SendPrivateMessageResponse,
    SendPrivateMessageVariables
  >(SEND_PRIVATE_MESSAGE_MUTATION, {
    onCompleted() {
      setMessageContent('');

      loadRecentChats();
    },
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageContent(e.target.value);
  }

  function handleInputFocus() {
    if (meData) readAllMessages(chatId, meData.id);
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Enter' || sendingPrivateMessage || !messageContent) {
      return;
    }

    sendPrivateMessage({ variables: { chatId, content: messageContent } });
  }

  return (
    <footer className="bg-dark-600 w-full px-2 py-1">
      <input
        autoComplete="off"
        className="rounded-lg bg-dark-700 w-[85%] sm:w-full px-2 py-1"
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onKeyDown={handleInputKeyDown}
        placeholder={`Mensaje para ${user.username}`}
        ref={messagesInputRef}
        value={messageContent}
      />
    </footer>
  );
}
