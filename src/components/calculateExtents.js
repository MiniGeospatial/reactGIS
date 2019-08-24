import React, { Component } from 'react';
import Popup from 'reactjs-popup';
import { keyGen } from '../utils/keyGen';
import { getExtentsPolygon } from '../utils/extents';

export default class Extents extends Component {
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
  }

  onButtonPress(event) {
    const layerKey = this.getLayerKey();
    const layerToCalculate = this.props.layers.filter(
      l => l.layerKey === layerKey
    );
    const extents = getExtentsPolygon(layerToCalculate[0].nodes);
    this.props.addLayer(
      {
        name: layerToCalculate[0].name + '_extents',
        geometryType: layerToCalculate[0].geometryType,
        nodes: extents,
        layerKey: keyGen(),
        visable: this.state.visable,
      }
    )
    this.setState({layerKey: ''})
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

  avaliableLayers() {
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
    return(
      <Popup
        trigger={<div className="bm-item">Calculate Extents</div>}
        modal
        key='calculate_extentes'>
        {close => (
          <div>
            <h2>Calculate Extents</h2>
            <p>Layer Name</p>
            <select onChange={this.selectLayer}>
              {this.avaliableLayers()}
            </select>
            <button
              onClick={() => {
                this.onButtonPress();
                close();
              }}
              disabled={this.props.layers.length === 0}
            >
              Calculate
            </button>
          </div>
        )}
      </Popup>
    )
  }
}
