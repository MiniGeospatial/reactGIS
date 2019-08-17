import React, { Component } from 'react';
import MapDisplay from './components/map';
import InputBox from './components/inputWkt';
import OutputBox from './components/outputWkt';

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 5,
    userPoly: [],
    nodes: []
  }

  getPolygon = (nodes) => {
    this.setState({userPoly: nodes});
  }

  nodes = (nodes) => {
    this.setState({nodes: nodes});
  }


  render() {
    return (
      <div>
        <div>
          <h1>My Glorious Map</h1>
          <div id="float-left">
            <InputBox userPolygon={this.getPolygon} nodes={this.nodes}/>
          </div>
          <div id="float-right">
            <OutputBox nodes={this.state.nodes}/>
          </div>
        </div>
        <div id="mapid">
          <MapDisplay input={this.state.userPoly}/>
        </div>
      </div>);
  }
}

export default App;
