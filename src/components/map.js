import React, { Component } from 'react';
import { Map, TileLayer, Polygon, Polyline, Marker, Popup, ZoomControl} from 'react-leaflet';
import { toGoogle, toGooglePoint } from '../utils/polygonConvert';
import { getExtents } from '../utils/extents';
import { area } from '../utils/area';
import { toWkt } from '../utils/wkt';

export default class MapDisplay extends Component {
  constructor(props) {
    super(props);
      this.state = {
        bounds: toGoogle([[374750, 406050], [375151, 406571]]),
        layers: [],
        height: 0
      }
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    this.updateDimensions();
  }

  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions)
  }

  componentWillUnmount () {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({ height: window.innerHeight });
  }

  bounds() {
    if (this.props.layers.length > 0 ) {
      if (this.props.layers[0].geometryType === 'POINT') {
        const point = this.props.layers[0].nodes;
        const box = [[point[0]-100, point[1]-100], [point[0]+100, point[1]+100]];
        return toGoogle(getExtents(box));
      }
      const lastPolygon = this.props.layers[0].nodes;
      return toGoogle(getExtents(lastPolygon));
    } else {
      return this.state.bounds;
    }
  }

  visableLayers() {
    const visable = this.props.layers.filter(layer => layer.visable)
    return visable.map((layer) => {
      if (layer.geometryType === 'POLYGON') {
        return this.polygon(layer);
      }
      else if (layer.geometryType === 'LINESTRING') {
        return this.linestring(layer);
      }
      else if (layer.geometryType === 'POINT') {
        return this.point(layer);
      }
      return null;
    });
  }

  point(layer) {
    return (
      <Marker position={toGooglePoint(layer.nodes)}
        color={`#${layer.layerKey}`}
        key={layer.layerKey}
      >
        <Popup key={layer.layerKey + '_p'}>
          <h2>{layer.Name}</h2>
          <h2>Wkt</h2>
          <p>{toWkt(layer.geometryType, layer.nodes)}</p>
        </Popup>
      </Marker>
    )
  }

  linestring(layer) {
    return (
      <Polyline positions={toGoogle(layer.nodes)}
        color={`#${layer.layerKey}`}
        weight="2"
        key={layer.key}>
        <Popup key={layer.layerKey+'_p'}>
          <h2>{layer.name}</h2>
          <h2>Wkt</h2>
          <p>{toWkt(layer.geometryType, layer.nodes)}</p>
        </Popup>
      </Polyline>
    )
  }

  polygon(layer) {
    return (
      <Polygon positions={toGoogle(layer.nodes)}
        color={`#${layer.layerKey}`}
        weight="2"
        key={layer.key}>
        <Popup key={layer.layerKey+'_p'}>
          <h2>{layer.name}</h2>
          <h2>Area</h2>
          <p>Area: {area(layer.nodes)} m2</p>
          <h2>Wkt</h2>
          <p>{toWkt(layer.geometryType, layer.nodes)}</p>
        </Popup>
      </Polygon>
    );
  }

  render() {
    return (
      <Map bounds={this.bounds()} zoomControl={false} style={{height: this.state.height}} useFlyTo={true}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          maxZoom="18"
        />
        {this.visableLayers()}
        <ZoomControl position="bottomleft" />
      </Map>
    )
  }
}
