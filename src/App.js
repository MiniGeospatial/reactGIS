import React, { Component } from 'react';
import { slide as Menu } from "react-burger-menu";
import MapDisplay from './components/map';
import NewLayer from './components/addNewLayer';
import ReduceLayer from './components/reduceNodes';
import RemoveLayer from './components/removeLayer';

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 5,
    isMenuOpen: false,
    layers: [],
  }

  getPolygon = (nodes) => {
    this.setState({userPoly: nodes});
  }

  nodes = (nodes) => {
    this.setState({nodes: nodes});
  }

  tolerance = (tolerance) => {
    this.setState({tolerance: tolerance});
  }

  closeMenu = () => {
    this.setState({isMenuOpen: false});
  }

  openMenu = (state) => {
    this.setState({isMenuOpen: state.isOpen})
  }

  removeLayer = (layerKey) => {
    const newLayers = this.state.layers.filter(l => l.layerKey !== layerKey);
    this.setState({layers: newLayers});
  }

  addLayer = (newLayer) => {
    if (newLayer.nodes.length > 0) {
      const allLayers = this.state.layers
      allLayers.push(newLayer);
      this.setState({layers: allLayers});
    }
  }


  render() {
    return (
      <div id="App">
        <Menu left isOpen={this.state.isMenuOpen} onStateChange={this.openMenu}>
          <h2>Layer Tools</h2>
          <NewLayer addLayer={this.addLayer}/>
          <RemoveLayer layers={this.state.layers} removeLayer={this.removeLayer} />
          <h2>Procesing Tools</h2>
          <ReduceLayer addLayer={this.addLayer} layers={this.state.layers}/>
        </Menu>
        <h1>ReactGIS</h1>
        <div id="mapid">
          <MapDisplay layers={this.state.layers}/>
        </div>
      </div>);
  }
}

export default App;
