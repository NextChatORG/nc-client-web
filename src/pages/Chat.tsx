import { useMessages } from '@nc-core/hooks';
import {
  Badge,
  ChatBox,
  Content,
  Grid,
  MainTemplate,
  MessagePreview,
  NoChatSelected,
  Search,
  Typography,
} from '@nc-ui';
import { useParams } from 'react-router-dom';

export default function Chat(): JSX.Element {
  const { recentChats, unreadChats } = useMessages();
  const { chatId } = useParams();

  return (
    <MainTemplate>
      <Grid item xs={12}>
        <Grid container fullHeight spacing={12}>
          <Grid item>
            <div
              style={{
                height: 'calc(100vh - 48px)',
                maxHeight: 'calc(100vh - 48px)',
                width: 320,
              }}
            >
              <Content fullHeight noPadding>
                <Typography
                  withLetterSpacing
                  component="h3"
                  style={{
                    alignItems: 'center',
                    display: 'flex',
                    gap: 8,
                    padding: '16px 24px',
                  }}
                  variant="title"
                >
                  Conversaciones
                  <Badge counter={unreadChats} />
                </Typography>
                {recentChats.length > 0 ? (
                  recentChats.map((recentChat, i) => (
                    <MessagePreview
                      data={recentChat}
                      key={`chat_${recentChat.chat.id}_${i}`}
                    />
                  ))
                ) : (
                  <Grid container alignItems="center" direction="column">
                    <Grid item>
                      <Typography>No tienes conversaciones</Typography>
                    </Grid>
                  </Grid>
                )}
              </Content>
            </div>
          </Grid>
          <Grid item xs="auto">
            <Search />
            <div style={{ marginTop: 12 }}>
              {chatId ? <ChatBox chatId={chatId} /> : <NoChatSelected />}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </MainTemplate>
  );
}
