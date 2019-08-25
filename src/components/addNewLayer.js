import React, { Component } from 'react';
import Popup from "reactjs-popup";

import { keyGen } from "../utils/keyGen";
import { fromWkt } from '../utils/wkt';

export default class NewLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      wkt: '',
    }
    this.updateLayerName = this.updateLayerName.bind(this);
    this.updateNodes = this.updateNodes.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  updateLayerName(event) {
    this.setState({name: event.target.value})
  }

  updateNodes(event) {
    this.setState({wkt: event.target.value})
  }

  onButtonPress(event) {
    const geometry = fromWkt(this.state.wkt);
    this.props.addLayer(
      {
        name: this.state.name,
        geometryType: geometry.geometryType,
        nodes: geometry.nodes,
        layerKey: keyGen(),
        visable: true,
        }
    )
  }

  keyGen() {
    return Math.random().toString(36).substr(2,9);
  }

  render() {
    return (
      <Popup
        trigger={<div className="bm-item">Add New Layer</div>}
        modal
        key='add_layer'>
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
