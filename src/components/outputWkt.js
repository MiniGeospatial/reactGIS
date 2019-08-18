import React, { Component } from 'react';
import { toWkt } from '../utils/wkt';
import { dp } from '../utils/dp';

export default class OutputWkt extends Component {

  newWkt = () => {
    if (this.props.nodes.length > 0) {
      return toWkt(dp(this.props.nodes, this.props.tolerance));
    } else {
      return '';
    }
  }

  render() {
    return (
      <div>
        <h2>Output wkt:</h2>
        <textarea
          value={this.newWkt()}
          readOnly
          placeholder="Your new wkt will appear here"/>
      </div>
    )
  }
}
