import React, { Component } from 'react';
import Popup from "reactjs-popup";
import { fromWkt } from '../utils/wkt';
import { toGoogle } from '../utils/polygonConvert';

export default class InputBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userPolygon: '',
      tolerance: 1,
    }
    this.updatePolygon = this.updatePolygon.bind(this);
    this.updateTolerance = this.updateTolerance.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  updatePolygon(event) {
    this.setState({userPolygon: event.target.value});
  }

  updateTolerance(event) {
    this.setState({tolerance: event.target.value});
    this.props.tolerance(this.state.tolerance);
  }

  onButtonPress(event) {
    const nodes = fromWkt(this.state.userPolygon)
    this.props.userPolygon(toGoogle(nodes));
    this.props.nodes(nodes);
    this.props.tolerance(this.state.tolerance);
  }

  onKeypress = (event) => {
    if (event.key === "Enter") {
      const nodes = fromWkt(event.target.value);
      this.props.userPolygon(toGoogle(nodes));
      this.props.nodes(nodes);
    };
  };

  render() {
    return (
      <Popup trigger={<button>Enter wkt</button>} modal>
        <div id="intro">
          <div id="float-left">
            <h2>Input Wkt</h2>
            <textarea
              id="inputBox"
              onKeyPress={this.onKeypress}
              onChange={this.updatePolygon}
              placeholder="Enter your wkt here...">
            </textarea>
          </div>
          <div id="float-right">
            <h2>Settings</h2>
            <p>Tolerance</p>
            <input
              type="number"
              max="10"
              min="1"
              onChange={this.updateTolerance}
              defaultValue="1"/>
            <button onClick={this.onButtonPress}>
              Reduce
            </button>
          </div>
          <div id="clear"></div>
        </div>
      </Popup>
    )
  }
}
