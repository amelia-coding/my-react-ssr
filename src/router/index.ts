/**
 * loadable的异步组件加载前无法获取引用，因而asyncData无法定义在组件的static方法中
 * 服务端preload的数据如果跨路由相关，请求操作应放在最下层路由
 */

import loadable from '@loadable/component';
import {
  fetchCityListAndQuality,
  fetchCityListAndTemperature,
  getCityList,
} from '@pages/weather/slice';
import NestedRoute from './NestedRoute';
import StatusRoute from './StatusRoute';

const Index = loadable(() => import('@pages/Index'));
const Home = loadable(() => import('@pages/Home'));
const About = loadable(() => import('@pages/About'));
const WeatherPage = loadable(() => import('@pages/weather/home'));

export default [
  {
    path: '/index',
    component: Index,
    exact: true,
    authCode: 'index',
  },
  {
    path: '/home',
    component: Home,
    exact: true,
    authCode: 'home',
  },
  {
    path: '/about',
    authCode: 'about',
    component: About,
    exact: true,
  },
  {
    path: '/weather',
    authCode: 'weather',
    component: WeatherPage,
    //asyncData: WeatherPage.asyncData, // 异步代码加载前无法拿到引用
    asyncData(store) {
      return store.dispatch(getCityList());
    },
    routes: [
      {
        path: '/weather/quality',
        component: loadable(() => import('@pages/weather/quality/index')),
        asyncData(store, query) {
          const { city } = query;
          console.log(city);
          const promise = store.dispatch(fetchCityListAndQuality(city || undefined));
          return promise;
        },
      },
      {
        path: '/weather/temperature',
        component: loadable(() => import('@pages/weather/temperature/index')),
        asyncData(store, query) {
          const { city } = query;
          const promise = store.dispatch(fetchCityListAndTemperature(city || undefined));
          return promise;
        },
      },
    ],
  },
];

export { NestedRoute, StatusRoute };
