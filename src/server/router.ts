import Router from 'koa-router';
import routes from '../router/index';
import render from './render';

const router = new Router({
  prefix: '/',
});

router.all('*', async (ctx) => {
  const initStore = {
    privilege: ['weather', 'index', 'home', 'about'],
  };
  const html = await render(routes, ctx, undefined, initStore);
  ctx.body = html;
});

export default router;
