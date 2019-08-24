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
      layerKey: '',
      visable: true,
    }

    this.avaliableLayers = this.avaliableLayers.bind(this);
    this.updateLayerName = this.updateLayerName.bind(this);
    this.selectLayer = this.selectLayer.bind(this);
    this.updateTolerance = this.updateTolerance.bind(this);
  }

  onButtonPress(event) {
    const layerKey = this.getLayerKey();
    const layerToReduce = this.props.layers.filter(l => l.layerKey === layerKey);
    const reducedNodes = dp(layerToReduce[0].nodes, this.state.tolerance)
    this.props.addLayer(
      {
        name: this.state.name,
        geometryType: this.state.geometryType,
        nodes: reducedNodes,
        layerKey: keyGen(),
        visable: this.state.visable,
      }
    )
    this.setState({layerKey: ''});
  }

  getLayerKey() {
     if (this.state.layerKey) {
       return this.state.layerKey
     } else {
       return this.props.layers[0].layerKey
     }
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

  avaliableLayers() {
    const layers = this.props.layers.map(l => {
      return (
        <option value={l.layerKey} key={l.layerKey + '_rno'}>
          {l.name}
        </option>
      )
    });
    return layers
  }

  render() {
    return (
      <Popup
        trigger={<div className="bm-item">Reduce Complexity</div>}
        modal
        key='reduce_nodes'>
        {close => (
          <div>
            <h2>Reduce Polygon</h2>
            <p>Layer Name</p>
            <select onChange={this.selectLayer}>
              {this.avaliableLayers()}
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
            <button
              disabled={this.props.layers.length === 0}
              onClick={() => {
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
