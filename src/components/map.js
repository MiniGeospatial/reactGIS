import React, { Component } from 'react';
import { Map, TileLayer, Polygon, Popup } from 'react-leaflet';
import { toGoogle } from '../utils/polygonConvert';
import { dp } from '../utils/dp';
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
      const latlngs = toGoogle(dp(this.props.input, this.props.tolerance));

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
    if (this.props.input.length > 0 ){
      return (
        <div>
          <Polygon positions={toGoogle(this.props.input)}
            color="black"
            weight="4">
            <Popup>
              The original
            </Popup>
          </Polygon>
          <Polygon positions={toGoogle(dp(this.props.input, this.props.tolerance))}
            color="green"
            weight="3">
            <Popup>
              One badass polygon
            </Popup>
          </Polygon>
        </div>
      )
    } else {
      return(
        <Polygon positions={[]}>
        </Polygon>
      )
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
        {this.polygon()}
      </Map>
    )
  }
}
