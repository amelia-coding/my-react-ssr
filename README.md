# SSR 项目介绍

## 运行

`npm run dev`执行客户端、服务端的文件打包，完成后再运行`node build/server.js`启动后台服务，浏览器打开`localhost:5000`

## TODO LIST

- [] 如何解决 ssr 的初始数据在 csr 接管后重复请求的问题
- [] 前后端路由加入鉴权（路由导航卫士？）
- [] api：服务端渲染数据请求、客户端 ajax、接口代理（对接后台）、跨域等
- [] ejs 和 react 路由切换，数据通信
- [] react 的 UI 库
- [] 尽量使用 node/browser 兼容的库，避免环境不一样写的代码有 bug
- [] 关注同构对 node 服务器性能的影响
- [] 模拟 next.js 实现预加载数据的生命钩子
- [] asyncData 可否获取 props 信息
- [] code split
- [] 脚手架：热更新、生产与开发环境区分配置、调试体验
- [] 路由文件配置整理
- [] koa 程序目录整理搭建
- [] mobx
- [] react-hemlet 定义头部信息

- [x] ts 改造
- [] css treeshaking(purecss)
- [] hmr 的引入
- [] postcss 引入，必须设置 overrideBrowserslist
- [] mock:开源的 yapi 可视化接口管理平台
- [] docker 部署

## 坑

- connect(redux)/observer(mobx)会劫持 showComponentUpdate，使得路由更新时页面组件感知不到，需要套一层 withRouter(react-router-dom)解决，而且所有父元素都要套啊啊啊啊([官方解答](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md#blocked-updates))（[官宣 2](https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md)）
- `react-router-config`的`renderRoutes`也需要层层套，不能断裂，否则孙子组件无法渲染
