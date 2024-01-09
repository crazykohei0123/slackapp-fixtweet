const { App } = require('@slack/bolt');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET,
  socketMode: true,
  appToken: process.env.SLACK_APP_TOKEN,
  // ソケットモードではポートをリッスンしませんが、アプリを OAuth フローに対応させる場合、
  // 何らかのポートをリッスンする必要があります
  customRoutes: [
    {
      path: '/health-check',
      method: ['GET'],
      handler: (req, res) => {
        res.writeHead(200);
        res.end('Health check information displayed here!');
      },
    },
  ],
  port: process.env.PORT || 3000
  
});

// "hello" を含むメッセージをリッスンします
app.message('(https://(x\.com|twitter\.com)[^\s]+)', async ({ message, say }) => {
  const regex = /(x\.com|twitter\.com)/;
  try {
    let posturl = message.text;
    await say(posturl.replace(regex, 'fxtwitter.com'));
  } catch (error) {
    console.error(error);
  }
});

app.event('app_mention', async ({ event, say }) => {
  const regex = /(x\.com|twitter\.com)/;
  try {
    let posturl = event.text;
    await say(posturl.replace(regex, 'fxtwitter.com'));
  } catch (error) {
    console.error(error);
  }
});

(async () => {
  // アプリを起動します
  await app.start();
  console.log('⚡️ Bolt app is running!');
})();
