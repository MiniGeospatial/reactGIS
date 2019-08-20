import React, { Component } from 'react';
import { slide as Menu } from "react-burger-menu";
import MapDisplay from './components/map';
import InputBox from './components/inputWkt';
import OutputBox from './components/outputWkt';
import NewLayer from './components/addNewLayer';
import ReduceLayer from './components/reduceNodes';

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 5,
    userPoly: [],
    nodes: [],
    tolerance: 1,
    showPopup: false,
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

  tooglePopup = () => {
    this.setState({showPopup: !this.state.showPopup});
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
        <Menu left>
          <h2>Layer Tools</h2>
          <NewLayer addLayer={this.addLayer}/>
          <h2>Procesing Tools</h2>
          <ReduceLayer addLayer={this.addLayer} layers={this.state.layers}/>
        </Menu>
        <div di="page-wrap">
          <h1>ReactGis</h1>
          <div id="intro">
            <InputBox userPolygon={this.getPolygon} nodes={this.nodes} tolerance={this.tolerance}/>
          </div>
          <div id='spaceBelow'>
            <OutputBox nodes={this.state.nodes} tolerance={this.state.tolerance}/>
          </div>
          <div id="mapid">
            <MapDisplay layers={this.state.layers}/>
          </div>
        </div>
      </div>);
  }
}

export default App;
