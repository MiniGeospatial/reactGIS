import React, { Component } from 'react';
import { Map, TileLayer, Polygon, Popup } from 'react-leaflet';
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
    if (this.props.input.length > 0) {
      const lats = this.props.input.map(latlng => latlng[0]);
      const lngs = this.props.input.map(latlng => latlng[1]);

      const latSum = Math.min(...lats) + Math.max(...lats);
      const lngSum = Math.min(...lngs) + Math.max(...lngs);

      const lat = latSum / 2
      const lng = lngSum / 2

      return [lat, lng];
    } else {
      return [this.state.lat, this.state.lng]
    }
  }

  render() {
    const center = this.centrePoint()

    return (
      <Map center={center} zoom={this.state.zoom}>
        <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
          maxZoom="18"
        />
        <Polygon
          // key={this.props.input.length > 0 ? 5 : 10}
          positions={this.props.input}
        >
          <Popup>
            This is my motherfucking polygon
          </Popup>
        </Polygon>
      </Map>
    )
  }
}
