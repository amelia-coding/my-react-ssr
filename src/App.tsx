import 'antd/dist/antd.css';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect, Switch } from 'react-router-dom';
import './App.less';
import router, { NestedRoute, StatusRoute } from './router/index';
import { RootState } from './store';

interface StateProps {
  privilege: Array<string>;
}

type AppProps = StateProps;

const App: React.FC<AppProps> = (props) => {
  const { privilege } = props;
  return (
    <div>
      <ul className="nav">
        <Link to="/">Index</Link>
        <Link to="/home">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/weather">WeatherPage</Link>
      </ul>
      <hr />
      <Switch>
        {router.map((route, i) => (
          <NestedRoute {...route} key={i} isAuthenticated={privilege.includes(route.authCode)} />
        ))}
        <Redirect from="/" to="/index" exact={true} />
        <StatusRoute code={404}>
          <div>
            <h1>Not Found</h1>
          </div>
        </StatusRoute>
      </Switch>
    </div>
  );
};

export default connect((state: RootState) => {
  return {
    privilege: state.privilege || [],
  };
})(App);
