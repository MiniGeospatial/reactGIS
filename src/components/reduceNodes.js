import React, { Component } from 'react';
import Popup from 'reactjs-popup';

import { fromWkt } from '../utils/wkt';
import { dp } from '../utils/dp';

export default class ReduceLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      geometryType: 'POLYGON',
      nodes: '',
    }
    this.availbeLayers = this.availbeLayers.bind(this);
    this.updateLayerName = this.updateLayerName.bind(this);
  }

  onButtonPress(event) {
    const reducedNodes = dp(fromWkt(this.state.nodes),5)
    this.props.addLayer(
      {
        name: this.state.name,
        geometryType: this.state.geometryType,
        nodes: reducedNodes,
        }
    )
  }

  updateLayerName(event) {
    this.setState({name: event.target.value})
  }

  availbeLayers() {
    const layers = this.props.layers.map(l => {
      return (
        <option value={l.name}>
          {l.name}
        </option>
      )
    })
    return layers
  }

  render() {
    return (
      <Popup
        trigger={<div className="bm-item">Reduce Complexity</div>}
        modal >
        {close => (
          <div>
            <h2>Reduce Polygon</h2>
            <p>Layer Name</p>
            <select onChange={this.selectLayer}>
              {this.availbeLayers()}
            </select>
            <p>Tolerance</p>
            <input
              type="number"
              max="10"
              min="1"
              onChange={this.updateTolerance}
              defaultValue="1"/>
              <p>LayerName</p>
              <input />
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
