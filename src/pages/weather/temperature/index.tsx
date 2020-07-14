import { RootDispacth, RootState } from '@store/index';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { fetchCityListAndTemperature } from '../slice';

interface StateProps {
  weather: Array<any>;
}

interface DispatchProps {
  fetchCityListAndTemperature: typeof fetchCityListAndTemperature;
}

type Props = StateProps & DispatchProps & RouteComponentProps;

const Temperature: React.FC<Props> = (props) => {
  const { weather } = props;
  useEffect(() => {
    const {
      location: { search },
      fetchCityListAndTemperature,
    } = props;
    console.log(search, fetchCityListAndTemperature);
  }, []);
  return (
    <div>
      <div>temperature</div>
      <ul>{weather && weather.map((item, idx) => <li key={idx}>{item.cond_txt_d}</li>)}</ul>
    </div>
  );
};

function mapStateToProps(state: RootState) {
  return {
    weather: state.weather.weather,
  };
}

function mapDispatchToProps(dispatch: RootDispacth) {
  return bindActionCreators(
    {
      fetchCityListAndTemperature,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(Temperature);
