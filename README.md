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
- ?? ssr和csr的随时切换

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
