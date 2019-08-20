import React, { Component } from 'react';
import { Map, TileLayer, Polygon, Popup, LayersControl } from 'react-leaflet';
import { toGoogle } from '../utils/polygonConvert';
import { toWkt } from '../utils/wkt';
const { BaseLayer, Overlay } = LayersControl;
// import L from 'leaflet';

export default class MapDisplay extends Component {
  constructor(props) {
    super(props);
      this.state = {
        lat: 53.552796,
        lng: -2.3794198,
        zoom: 16
      }
  }

  centrePoint() {
    if (this.props.layers.length > 0) {
      const lastPolygon = this.props.layers[0].nodes
      const latlngs = toGoogle(lastPolygon);

      const lats = latlngs.map(latlng => latlng[0]);
      const lngs = latlngs.map(latlng => latlng[1]);

      const latSum = Math.min(...lats) + Math.max(...lats);
      const lngSum = Math.min(...lngs) + Math.max(...lngs);

      const lat = latSum / 2
      const lng = lngSum / 2

      return [lat, lng];
    } else {
      return [this.state.lat, this.state.lng]
    }
  }

  polygon() {
    if (this.props.layers.length > 0 ){
      return( this.props.layers.map((p, index) => {
        console.log(p);
        return (
          <Overlay checked name={p.name} >
            <Polygon positions={toGoogle(p.nodes)}
              color="black"
              weight="2"
              key={index}>
            <Popup>
              {toWkt(p.nodes)}
            </Popup>
          </Polygon>
        </Overlay>
        )
      }));
    }
  }

  render() {
    const center = this.centrePoint()

    return (
      <Map center={center} zoom={this.state.zoom}>
        <LayersControl position="bottomleft">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              maxZoom="18"
            />
          </BaseLayer>
          {this.polygon()}
        </LayersControl>
      </Map>
    )
  }
}
