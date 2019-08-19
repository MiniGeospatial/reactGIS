import React, { Component } from 'react';
import MapDisplay from './components/map';
import InputBox from './components/inputWkt';
import OutputBox from './components/outputWkt';
import SideBar from './components/sidebar';

class App extends Component {
  state = {
    lat: 51.505,
    lng: -0.09,
    zoom: 5,
    userPoly: [],
    nodes: [],
    tolerance: 1,
    showPopup: false,
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


  render() {
    return (
      <div id="App">
        <SideBar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <div di="page-wrap">
          <h1>ReactGis</h1>
          <div id="intro">
            <InputBox userPolygon={this.getPolygon} nodes={this.nodes} tolerance={this.tolerance}/>
          </div>
          <div id='spaceBelow'>
            <OutputBox nodes={this.state.nodes} tolerance={this.state.tolerance}/>
          </div>
          <div id="mapid">
            <MapDisplay input={this.state.nodes} tolerance={this.state.tolerance}/>
          </div>
        </div>
      </div>);
  }
}

export default App;
