import React, { Component } from 'react';
import Popup from 'reactjs-popup';

import { dp } from '../utils/dp';
import { keyGen } from '../utils/keyGen';

export default class ReduceLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      geometryType: 'POLYGON',
      nodes: '',
      tolerance: 1,
      layerKey: ''
    }

    this.availbeLayers = this.availbeLayers.bind(this);
    this.updateLayerName = this.updateLayerName.bind(this);
    this.selectLayer = this.selectLayer.bind(this);
    this.updateTolerance = this.updateTolerance.bind(this);
  }

  componentWillReceiveProps() {
    const firstLayer = this.props.layers[0]
    if (firstLayer) {
      this.setState({layerKey: firstLayer.layerKey});
    }
  }

  onButtonPress(event) {
    console.log(this.props.layers);
    const layerToReduce = this.props.layers.filter(l => l.layerKey === this.state.layerKey);
    const reducedNodes = dp(layerToReduce[0].nodes, this.state.tolerance)
    this.props.addLayer(
      {
        name: this.state.name,
        geometryType: this.state.geometryType,
        nodes: reducedNodes,
        layerKey: keyGen(),
      }
    )
  }

  selectLayer(event) {
    this.setState({layerKey: event.target.value})
  }

  updateLayerName(event) {
    this.setState({name: event.target.value})
  }

  updateTolerance(event) {
    this.setState({tolerance: event.target.value})
  }

  availbeLayers() {
    const layers = this.props.layers.map((l, index) => {
      return (
        <option value={l.layerKey}>
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
              <input onChange={this.updateLayerName}/>
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
