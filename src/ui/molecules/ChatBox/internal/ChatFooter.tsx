import { SEND_PRIVATE_MESSAGE_MUTATION } from '@nc-core/api';
import { useAuth, useMessages, useMutation } from '@nc-core/hooks';
import {
  ObjectId,
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
}

export default function ChatFooter({
  chatId,
  classes,
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
    <div className={classes.chatBox__footer}>
      <Grid container>
        <Grid item xs="auto">
          <input
            autoComplete="off"
            className={classes.chatBox__footer__input}
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
