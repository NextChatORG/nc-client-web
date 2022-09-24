import {
  GetRecentMessagesResponse,
  GET_RECENT_MESSAGES_QUERY,
} from '@nc-core/api';
import { useQuery } from '@nc-core/hooks';
import {
  Content,
  Grid,
  MainTemplate,
  MessagePreview,
  NoChatSelected,
  Typography,
} from '@nc-ui';

export default function Home(): JSX.Element {
  const { data } = useQuery<GetRecentMessagesResponse>(
    GET_RECENT_MESSAGES_QUERY,
  );

  const headerRef = document.getElementById('nc-header');
  const minHeight = `calc(100vh - ${headerRef?.clientHeight ?? 0}px - 72px)`;

  return (
    <MainTemplate>
      <Grid item xs={12}>
        <Grid container fullHeight spacing={24}>
          <Grid item xs={3}>
            <div style={{ height: minHeight, minHeight }}>
              <Content fullHeight noPadding>
                <Typography
                  withLetterSpacing
                  component="h3"
                  style={{ padding: '16px 24px' }}
                  variant="title"
                >
                  Conversaciones
                </Typography>
                {(data?.getRecentMessages ?? []).length > 0 ? (
                  data?.getRecentMessages.map((recentMessage, i) => (
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
          <Grid item xs={9}>
            <div style={{ height: minHeight, minHeight }}>
              <NoChatSelected />
            </div>
          </Grid>
        </Grid>
      </Grid>
    </MainTemplate>
  );
}
