import React, { Component } from 'react';
import Popup from 'reactjs-popup';

export default class RemoveLayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layerKey: ''
    }
    this.selectLayer = this.selectLayer.bind(this);
    this.onButtonPress = this.onButtonPress.bind(this);
  }

  componen

  availbeLayers() {
    const layers = this.props.layers.map(l => {
      return (
        <option value={l.layerKey}>
          {l.name}
        </option>
      )
    });
    return layers
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

  onButtonPress() {
    const layer = this.getLayerKey();
    this.props.removeLayer(layer);
    this.setState({layerKey: ''});
  }

  render() {
    return (
      <Popup
        trigger={<div className="bm-item">Remove Layer</div>}
        modal
        key='remove_layer'>
        {close => (
          <div>
            <h2>Remove Layer</h2>
            <p>Layer Name</p>
            <select onChange={this.selectLayer}>
              {this.availbeLayers()}
            </select>
            <button
              onClick={() => {
                this.onButtonPress();
                close();
              }}
              disabled={this.props.layers.length === 0}
            >
              Remove
            </button>
          </div>
        )}
      </Popup>
    );
  }
}
