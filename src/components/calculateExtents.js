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

  componentWillReceiveProps() {
    const firstLayer = this.props.layers[0]
    if (firstLayer) {
      this.setState({layerKey: firstLayer.layerKey});
    }
  }

  onButtonPress(event) {
    console.log(this.props.layers);
    const layerToCalculate = this.props.layers.filter(
      l => l.layerKey === this.state.layerKey
    );
    const extents = getExtentsPolygon(layerToCalculate[0].nodes);
    this.props.addLayer(
      {
        name: this.state.name + '_extents',
        geometryType: this.state.geometryType,
        nodes: extents,
        layerKey: keyGen(),
        visable: this.state.visable,
      }
    )
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
    if (this.props.layers.lenght > 0) {
      this.setState({name: this.props.layers[0].name})
    }
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
            <button onClick={() => {
              this.onButtonPress();
              close();
            }}>
              Calculate
            </button>
          </div>
        )}
      </Popup>
    )
  }
}
