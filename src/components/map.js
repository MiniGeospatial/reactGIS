import React, { Component } from 'react';
import { Map, TileLayer, Polygon, Popup, LayersControl, ZoomControl} from 'react-leaflet';
import { toGoogle } from '../utils/polygonConvert';
import { getExtents } from '../utils/extents';
import { toWkt } from '../utils/wkt';
const { BaseLayer, Overlay } = LayersControl;

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
      const lastPolygon = this.props.layers[0].nodes;
      return toGoogle(getExtents(lastPolygon));
    } else {
      return this.state.bounds;
    }
  }

  polygon() {
    if (this.props.layers.length > 0 ){
      return( this.props.layers.map((p) => {
        if (p.visable) {
          return (
            <Overlay checked name={p.name} key={p.layerKey+'_n'}>
              <Polygon positions={toGoogle(p.nodes)}
                color={`#${p.layerKey}`}
                weight="2"
                key={p.key}>
                <Popup key={p.layerKey+'_p'}>
                  {toWkt(p.nodes)}
                </Popup>
              </Polygon>
            </Overlay>
          );
        } else {
          return null;
        }
      }));
    }
  }

  render() {
    return (
      <Map bounds={this.bounds()} zoomControl={false} style={{height: this.state.height}}>
        <LayersControl position="bottomright">
          <BaseLayer checked name="OpenStreetMap">
            <TileLayer url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
              maxZoom="18"
            />
          </BaseLayer>
          {this.polygon()}
        </LayersControl>
        <ZoomControl position="bottomright" />
      </Map>
    )
  }
}
