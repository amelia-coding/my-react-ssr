import { RootState } from '@store/index';
import React from 'react';
import { connect } from 'react-redux';

interface StateProps {
  count: number;
}

type AboutProps = StateProps;

const About: React.FC<AboutProps> = (props) => {
  const { count } = props;
  return (
    <div>
      About
      <div>来自Index的数据：{count}</div>
    </div>
  );
};

const mapStateToProps = function (state: RootState): StateProps {
  return {
    count: state.count,
  };
};

export default connect<StateProps, unknown, unknown, RootState>(mapStateToProps, null)(About);
