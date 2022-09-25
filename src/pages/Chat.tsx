import {
  GetRecentMessagesResponse,
  GET_RECENT_MESSAGES_QUERY,
} from '@nc-core/api';
import { useQuery } from '@nc-core/hooks';
import {
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
  const { chatId } = useParams();

  const { data, refetch: refetchRecentMessages } =
    useQuery<GetRecentMessagesResponse>(GET_RECENT_MESSAGES_QUERY);

  const recentMessages = data?.getRecentMessages ?? [];

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
                  style={{ padding: '16px 24px' }}
                  variant="title"
                >
                  Conversaciones
                </Typography>
                {recentMessages.length > 0 ? (
                  recentMessages.map((recentMessage, i) => (
                    <MessagePreview
                      data={recentMessage}
                      key={`chat_${recentMessage.userId}_${i}`}
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
            <div
              style={{
                height: '100%',
                marginTop: 12,
                maxHeight: 'calc(100vh - 48px - 62px)',
              }}
            >
              {chatId ? (
                <ChatBox
                  chatId={chatId}
                  refetchRecentMessages={refetchRecentMessages}
                />
              ) : (
                <NoChatSelected />
              )}
            </div>
          </Grid>
        </Grid>
      </Grid>
    </MainTemplate>
  );
}
