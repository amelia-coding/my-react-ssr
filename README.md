# React SSR 项目介绍

从 0 - 1 搭建可用的 React SSR 项目，实现客户端和服务端渲染

## 原理

ReactDOM 提供了服务端渲染的 API

基于`虚拟 Dom`，描述 dom 结构 的 js 对象，根据不同的平台来渲染。调用 `renderToString` & `renderToNodeStream` 将虚拟 dom 对象转换为 HTML 字符串

## 运行

git clone https://github.com/amelia-coding/my-react-ssr.git

npm install

### 客户端打包

npm run dev

#### 服务端运行

先执行客户端打包在运行 server

npm run build

npm run server

## 技术栈

react16.x + react-router4 + webpack4

- react
- typescript
- react-router-dom
- react-router-config（路由匹配）
- redux(数据管理)
- redux-thunk(支持异步 Action)
- react-helmet(Head 管理)
- react-lazyload(图片懒加载)
- loadable-components(代码分割)
- cross-fetch(浏览器和 node 通用的 Fetch API)
- koa(后端服务)

## 要解决和关注的问题

解决

- 路由同构
- 状态数据同构
- CSS 处理
- 模块异步加载、代码分割、动态加载
- fetch 同构
- mock 数据
- 跨域请求
- ?? ssr 和 csr 的随时切换

关注

- ?? node 性能的影响（ssr 渲染将一部分渲染的压力放在了服务端）

## 项目演进

- 前后端路由加入鉴权（路由导航卫士）
- 解决 ssr 的初始数据在 csr 接管后重复请求的问题
- 服务端请求、客户端请求、跨域、接口代理（对接后台）等
- 支持 CSS 模块化、Postcss
- 模块异步加载
- typecript 改造
- ?? HMR 热更新

## 业内成熟的框架

- react nextjs
- vue nuxtjs
- razzle
- umi

## 坑

1. connect 和 withRouter，connect 会使得组件变为 purcomponent，withRouter 并没有对 router 进行任何处理

```js
withRouter(
  connect(({ user, loading }) => ({
    user,
    loading,
  }))(App),
);
```

2. 引入 ts 后，@connect 和@withRouter 会报错

手动修复 connect 和 withRouter

## 总结

优点

服务端渲染的
优势在于可以极快的首屏优化 ，支持 SEO，与传统的 SPA 相比多了一种数据的处理方式。

缺点

SSR 配置比较复杂，不仅仅是前后端的配置问题，还需要考虑后端性能，例如登录态、高并发、负载均衡、内存管理等，其主要是用于 SEO，不太建议用做服务端渲染，其能够使用的场景不多，而且成本代价太大

## 热更新原理

```js
// 1、修改入口文件，增加热更新文件
clientConfig.entry.app = ['webpack-hot-middleware/client', clientConfig.entry.app];
clientConfig.output.filename = 'static/js/[name].[hash].js';
clientConfig.plugins.push(new webpack.HotModuleReplacementPlugin());

// 2、客户端打包
const clientCompiler = webpack(clientConfig);

const devMiddleware = require('webpack-dev-middleware')(clientCompiler, {
  publicPath: clientConfig.output.publicPath,
  logLevel: 'warn',
});
// 3、使用 webpack-dev-middleware 中间件服务 webpack 打包后的资源文件
app.use(devMiddleware);

/src/lib/client/index.js负责websocket客户端hash和ok事件的监听，ok事件的回调只干了一件事发射webpackHotUpdate事件

/src/lib/client/hot/dev-server.js负责监听webpackHotUpdate，调用hotCheck开始拉取代码，实现局部更新
```

## 性能优化

treeshaking:深度 treeshaking webpack-deep-scope-plugin webpack-parallel-uglify-plugin purifycss-webpack purgecss-webpack-plugin

开启多核压缩 happypack 多线程编译 webpack 不支持的情况下使用 thread-loader
CSS 的多核压缩 optimize-css-assets-webpack-plugin

## loadable 原理

要实现服务端渲染

我们需要根据路由找到当前要渲染的组件，通过 renderToString 转化成字符串拼接 html 返回，
同时客户端也要能够再次渲染组件添加事件处理等，所以要找到当前页客户端渲染所需的 css 和 js 静态资源
同时为了能够让客户端重用服务端直出的 html 结点，不再是先显示 loading 再显示组件，这样会造成冲突已经性能问题，
就需要等待异步加载的组件加载完成后才开始渲染页面

loadable:
提供了一个 webpack 插件，用于生成客户端打包后的每个页面的 chunk 信息 stats.json
服务端提供了 collectChunk 的函数,能夠從 stats.json 中提取出當前要渲染的頁面組件，以及当前页面需要的 js 和 css 静态文件
为了解决重用问题，loadableReady 函数等待组件加载成功之后才开始渲染页面
