import { ChunkExtractor } from '@loadable/server';
import path from 'path';
import queryString from 'query-string';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { matchRoutes } from 'react-router-config';
import { StaticRouter } from 'react-router-dom';
import App from '../App';
import createStore from '../store/index';

export default async function render(routes, ctx, context = {}, initStore = {}) {
  const store = createStore(initStore);

  // store.subscribe(() => {
  //   console.log('store: ', store.getState());
  // });

  // 各组件获取初始化数据: TODO: 加上鉴权
  const [url, seach] = ctx.req.url.split('?');
  const query = queryString.parse(seach);
  const branch = matchRoutes(routes, url);

  const promises = branch.map(({ route, match, location, history }) => {
    return route.asyncData ? route.asyncData(store, query) : Promise.resolve(null);
  });

  await Promise.all(promises);

  // eslint-disable-next-line no-undef
  const webStats = path.resolve(process.env.CLIENT_ASSET_PATH, 'client-bundle.json');

  const webExtractor = new ChunkExtractor({
    entrypoints: ['client'],
    statsFile: webStats,
  });

  console.log(ctx.url);
  // Wrap your application using "collectChunks"
  const jsx = webExtractor.collectChunks(
    <Provider store={store}>
      <StaticRouter location={ctx.url} context={context}>
        <App />
      </StaticRouter>
    </Provider>,
  );

  const html = renderToString(jsx);
  if (context.url) {
    console.log('重定向:', context.url);
  }
  if (context.statusCode) {
    return `<script type="text/javascript" src="//qzonestyle.gtimg.cn/qzone/hybrid/app/404/search_children.js" charset="utf-8"></script>`;
  }
  // const html = renderToString(<App />)
  // You can now collect your script tags
  const scriptTags = webExtractor.getScriptTags(); // or extractor.getScriptElements();
  // You can also collect your "preload/prefetch" links
  const linkTags = webExtractor.getLinkTags(); // or extractor.getLinkElements();
  // And you can even collect your style tags (if you use "mini-css-extract-plugin")
  const styleTags = webExtractor.getStyleTags(); // or extractor.getStyleElements();
  const preloadedState = store.getState();
  const helmet = Helmet.renderStatic();
  return `
    <html>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        <!-- ${linkTags} -->
        ${styleTags}
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};
        </script>
        ${scriptTags}
      </body>
    </html>
  `;
}
