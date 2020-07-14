import { RouteConfigDeclaration } from '@src/router/type';
import { RootDispacth, RootState } from '@store/index';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCityList } from '../slice';
import Detail from './components/Detail';

interface StateProps {
  cityList: Array<any>;
}

interface DispachProps {
  getCityList: typeof getCityList;
}

interface RouterProps {
  router: RouteConfigDeclaration[];
}

type WeatherProps = StateProps & DispachProps & RouterProps;

class Weather extends Component<WeatherProps, null> {
  render() {
    const { cityList, router } = this.props;
    return (
      <div className="list">
        <ul>
          {cityList.map(({ location, cid }) => (
            <li key={cid}>
              <a href={`/weather/location=${location}`}>{location}</a>
            </li>
          ))}
        </ul>
        <Detail router={router} />
      </div>
    );
  }

  componentDidMount() {
    const { cityList } = this.props;
    if (cityList.length === 0) {
      this.props.getCityList();
    }
  }
}

function mapStateToProps(state: RootState) {
  return {
    cityList: state.weather?.cityList || [],
  };
}

function mapDispatchToProps(dispatch: RootDispacth) {
  return bindActionCreators(
    {
      getCityList,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Weather);
