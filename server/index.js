const request = require('request-promise-native');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

const router = new Router();
router.get('/api/friends/:user', async (ctx) => {
  const getFriendsUrl = (id) => `https://api.vk.com/method/friends.get?user_id=${id}&v=5.60`;
  const friends = await request(getFriendsUrl(ctx.params.user));
  console.log(friends.response);
  //ctx.body = Promise.all(friends.response.items.map(id=>request(getFriendsUrl(id))));
});
app.use(router.routes());

app.listen(3000);