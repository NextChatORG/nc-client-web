import { WatchQueryOptions } from '@apollo/client';
import {
  READ_ALL_MESSAGES_MUTATION,
  SEND_PRIVATE_MESSAGE_MUTATION,
} from '@nc-core/api';
import { useAuth, useMutation } from '@nc-core/hooks';
import {
  GetChatAndMessagesResponse,
  GetChatAndMessagesVariables,
  ObjectId,
  ReadAllMessagesResponse,
  ReadAllMessagesVariables,
  SendPrivateMessageResponse,
  SendPrivateMessageVariables,
  User,
} from '@nc-core/interfaces/api';
import { Grid } from '@nc-ui';
import { useRef, useState } from 'react';

interface ChatFooterProps {
  chatId: ObjectId;
  classes: CSSModuleClasses;
  user: User;
  refetchRecentChats(): void;
  updateMessages(
    mapFn: (
      previousQueryResult: GetChatAndMessagesResponse,
      options: Pick<
        WatchQueryOptions<
          GetChatAndMessagesVariables,
          GetChatAndMessagesResponse
        >,
        'variables'
      >,
    ) => GetChatAndMessagesResponse,
  ): void;
}

export default function ChatFooter({
  chatId,
  classes,
  refetchRecentChats,
  updateMessages,
  user,
}: ChatFooterProps): JSX.Element {
  const [messageContent, setMessageContent] = useState<string>('');

  const messagesInputRef = useRef<HTMLInputElement | null>(null);

  const { data: meData } = useAuth();

  const [readAllMessages] = useMutation<
    ReadAllMessagesResponse,
    ReadAllMessagesVariables
  >(READ_ALL_MESSAGES_MUTATION, {
    onCompleted({ readAllMessages }) {
      if (!readAllMessages) return;

      refetchRecentChats();

      updateMessages((prev) => ({
        ...prev,
        messages: prev.messages.map((message) => {
          if (!message.read && message.senderId !== meData?.id) {
            return { ...message, read: true };
          }

          return message;
        }),
      }));
    },
  });

  const [sendPrivateMessage, { loading: sendingPrivateMessage }] = useMutation<
    SendPrivateMessageResponse,
    SendPrivateMessageVariables
  >(SEND_PRIVATE_MESSAGE_MUTATION, {
    onCompleted() {
      setMessageContent('');

      refetchRecentChats();

      setTimeout(() => {
        if (messagesInputRef.current) messagesInputRef.current.focus();
      }, 100);
    },
  });

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setMessageContent(e.target.value);
  }

  function handleInputFocus() {
    readAllMessages({ variables: { chatId } });
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && messageContent.length > 0) {
      sendPrivateMessage({ variables: { chatId, content: messageContent } });
    }
  }

  return (
    <div className={classes.chatBox__footer}>
      <Grid container>
        <Grid item xs="auto">
          <input
            autoComplete="off"
            className={classes.chatBox__footer__input}
            disabled={sendingPrivateMessage}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onKeyDown={handleInputKeyDown}
            placeholder={`Mensaje para ${user.username}`}
            ref={messagesInputRef}
            value={messageContent}
          />
        </Grid>
      </Grid>
    </div>
  );
}
