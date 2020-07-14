import { NestedRoute } from '@src/router/index';
import { RouteConfigDeclaration } from '@src/router/type';
import { withRouter } from '@store/connect';
import { Button } from 'antd';
import queryString from 'query-string';
import React, { Component } from 'react';
import { RouteComponentProps, Switch } from 'react-router-dom';

interface RouterProps {
  router: RouteConfigDeclaration[];
}

type Props = RouterProps & Partial<RouteComponentProps>;

@withRouter
class Detail extends Component<Props, null> {
  render(): JSX.Element {
    const { router } = this.props;
    return (
      <React.Fragment>
        <h2>城市weather详情</h2>
        <ul>
          <Button type="primary" onClick={this.goto.bind(this, 'temperature')}>
            温度
          </Button>
          <Button type="primary" onClick={this.goto.bind(this, 'quality')}>
            空气质量
          </Button>
        </ul>
        <Switch>
          {router.map((route, i) => (
            <NestedRoute {...route} key={i} isAuthenticated={true} />
          ))}
        </Switch>
      </React.Fragment>
    );
  }

  goto = (str: string): void => {
    const {
      location: { search },
      history,
    } = this.props;
    const { location: city } = queryString.parse(search);
    history.push({
      pathname: `/weather/${str}`,
      search: `?location=${city || 'beijing'}`,
    });
  };
}

export default Detail;
