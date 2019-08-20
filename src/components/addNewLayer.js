import React, { Component } from 'react';
import Popup from "reactjs-popup";

import { fromWkt } from '../utils/wkt';

export default class NewLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      geometryType: 'POLYGON',
      nodes: '',
    }
    this.updateLayerName = this.updateLayerName.bind(this);
    this.updateNodes = this.updateNodes.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  updateLayerName(event) {
    this.setState({name: event.target.value})
  }

  updateNodes(event) {
    this.setState({nodes: fromWkt(event.target.value)})
  }

  onButtonPress(event) {
    this.props.addLayer(
      {
        name: this.state.name,
        geometryType: this.state.geometryType,
        nodes: this.state.nodes,
        }
    )
  }

  render() {
    return (
      <Popup
        trigger={<div className="bm-item">Add New Layer</div>}
        modal >
        {close => (
          <div>
            <h2>Add New Layer</h2>
            <p>Layer Name</p>
            <input onChange={this.updateLayerName}></input>
            <p>Wkt</p>
            <textarea onChange={this.updateNodes}></textarea>
            <button onClick={() => {
              this.onButtonPress();
              close();
            }}>
              Add Layer
            </button>
          </div>
        )}
      </Popup>
    )
  }
}
