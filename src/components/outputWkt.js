import React, { Component } from 'react';
import { toWkt } from '../utils/wkt';
import { dp } from '../utils/dp';

export default class OutputWkt extends Component {

  newWkt = () => {
    if (this.props.nodes.length > 0) {
      return toWkt(dp(this.props.nodes, 1));
    } else {
      return '';
    }
  }

  render() {
    return (
      <div>
        <p>Output wkt:</p>
        <textarea value={this.newWkt()} />
      </div>
    )
  }
}
