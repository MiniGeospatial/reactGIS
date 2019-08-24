import React, { Component } from 'react';
import MapDisplay from './components/map';
import NewLayer from './components/addNewLayer';
import ReduceLayer from './components/reduceNodes';
import RemoveLayer from './components/removeLayer';
import Extents from './components/calculateExtents';

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

  openMenu = () => {
    console.log("called");
    this.setState({isMenuOpen: true});
  }

  removeLayer = (layerKey) => {
    const newLayers = this.state.layers.filter(l => l.layerKey !== layerKey);
    this.setState({layers: newLayers});
  }

  addLayer = (newLayer) => {
    if (newLayer.nodes.length > 0) {
      const allLayers = this.state.layers
      allLayers.unshift(newLayer);
      this.setState({layers: allLayers});
    }
  }

  layerVisibilty = (event) => {
    const layers = this.state.layers
    const newLayers = layers.map((l) => {
      if (l.layerKey === event.target.value) {
        return {
          name: l.name,
          geometryType: l.geometryType,
          nodes: l.nodes,
          layerKey: l.layerKey,
          visable: !l.visable,
          }
      } else {
        return l
      }
    })
    this.setState({layers: newLayers});
  }

  layerDisplay = () => {
    if (this.state.layers.length > 0) {
      return this.state.layers.map(l => {
        return (
          <div className="bm-item" key={l.layerKey + '_sidebar'}>
            <label key={l.layerKey + '_name'} className="layerName">
              {l.name}
              <input type="checkbox"
                value={l.layerKey}
                checked={l.visable}
                onChange={this.layerVisibilty}
                className="checkBox"
                key={l.layerKey + '_check'}/>
            </label>
          </div>
        );
      });
    }
  };

  render() {
    return (
      <div className="App">
        <div id="sidenav" className={this.state.isMenuOpen ? "LayerSidebarOpen" : "LayerSidebarClosed"}>
          <span className="closeButton" onClick={this.closeMenu}>&times;</span>
          <h2>Layers</h2>
          {this.layerDisplay()}
          <h2>Layer Tools</h2>
          <NewLayer addLayer={this.addLayer} />
          <RemoveLayer
            layers={this.state.layers}
            removeLayer={this.removeLayer}
            key={this.state.layers.length > 0 ? this.state.layers[0].key : 'blah'}/>
          <h2>Processing Tools</h2>
          <ReduceLayer addLayer={this.addLayer} layers={this.state.layers} />
          <Extents addLayer={this.addLayer} layers={this.state.layers} />
        </div>
        <span className="openButton" onClick={this.openMenu}>&#9776;</span>
        <div id={this.state.isMenuOpen ? "mainOpen" : "main"}>
          <MapDisplay layers={this.state.layers} key={1}/>
        </div>
      </div>
    );
  }
}

export default App;
