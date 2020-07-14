import { connect } from '@store/connect';
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { decrease, increase } from '../store/slice';

@connect(
  (state) => ({
    count: state.count,
  }),
  (dispatch) => {
    return bindActionCreators(
      {
        decrease,
        increase,
      },
      dispatch,
    );
  },
)
export default class Counter extends Component {
  render() {
    console.log(this.props.count);
    return (
      <div>
        <button onClick={this.increase}>+1</button>
        <button onClick={this.decrease}>-1</button>
        current: {this.props.count}
      </div>
    );
  }

  decrease = () => {
    this.props.decrease();
  };

  increase = () => {
    this.props.increase();
  };
}
