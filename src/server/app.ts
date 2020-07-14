import Koa from 'koa';
import favicon from 'koa-favicon';
import logger from 'koa-logger';
import serve from 'koa-static';
import path from 'path';
import router from './router';

const app = new Koa();
app.use(serve('./public'));

app.use(favicon(path.resolve(__dirname, '../favicon.ico')));

app.use(logger());

// react页面路由
app.use(router.routes()).use(router.allowedMethods());

app.listen(5000, () => {
  console.log('app now is servered in port 5000 ...');
});
