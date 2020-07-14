import React from 'react';
import { Redirect, Route } from 'react-router';
import { RouteConfigDeclaration } from './type';

const NestedRoute = (route: RouteConfigDeclaration & { isAuthenticated: boolean }): any => {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      /* 渲染路由对应的视图组件，将路由组件的props传递给视图组件 */
      render={(props) => {
        return route.isAuthenticated ? (
          <Route
            path={route.path}
            exact={route.exact}
            /* 渲染路由对应的视图组件，将路由组件的props传递给视图组件 */
            render={(props) => <route.component {...props} router={route.routes} />}
          />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        );
      }}
    />
  );
};

export default NestedRoute;
