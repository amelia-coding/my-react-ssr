import { connect, withRouter } from '@store/connect';
import { RootDispacth, RootState } from '@store/index';
import queryString from 'query-string';
import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchCityListAndQuality } from '../slice';

interface StateProps {
  quality: string;
}

interface DispatchProps {
  fetchCityListAndQuality: typeof fetchCityListAndQuality;
}

type props = StateProps & DispatchProps & RouteComponentProps;

@withRouter
@connect(mapStateToProps, mapDispatchToProps)
export default class Quality extends Component<props, null> {
  render(): JSX.Element {
    const { quality } = this.props;
    return (
      <div>
        <div>quality</div>
        {quality &&
          ['pm25', 'qlty'].map((item) => (
            <div key={item}>
              <label>{item}：</label>
              <span>{quality[item]}</span>
            </div>
          ))}
      </div>
    );
  }

  componentDidMount(): void {
    const {
      location: { search },
      fetchCityListAndQuality,
      quality,
    } = this.props;
    let { location: city } = queryString.parse(search);
    if (city instanceof Array) city = city[0];
    if (!quality) {
      fetchCityListAndQuality(city || '');
    }
  }
}

function mapStateToProps(state: RootState) {
  return {
    quality: state.weather?.quality,
  };
}

function mapDispatchToProps(dispatch: RootDispacth) {
  return bindActionCreators(
    {
      fetchCityListAndQuality,
    },
    dispatch,
  );
}
