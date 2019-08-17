import React, { Component } from 'react';
import { fromWkt } from '../utils/wkt';
import { toGoogle } from '../utils/polygonConvert';

export default class InputBox extends Component {

  onKeypress = (event) => {
    if (event.key === "Enter") {
      const nodes = fromWkt(event.target.value);
      this.props.userPolygon(toGoogle(nodes));
      this.props.nodes(nodes);
    };
  };

  render() {
    return (
      <div>
        <p>Input wkt:</p>
        <textarea onKeyPress={this.onKeypress}>
        </textarea>
      </div>
    )
  }
}
