import { Component } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet';
import shakerzMapPin from '../../assets/icons/shakerz-map-pin.svg';

const shakerzMarker = L.icon({
  iconUrl: shakerzMapPin,
  iconSize: [48, 58],
  iconAnchor: [24, 56],
  popupAnchor: [0, -48],
});

function MapFallback({ location }) {
  return (
    <div className="shop-map-fallback" role="status">
      <strong>Map unavailable</strong>
      <span>{location.address}</span>
      <a href={location.googleMapsUrl} target="_blank" rel="noreferrer">
        Open in Google Maps
      </a>
    </div>
  );
}

class MapErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <MapFallback location={this.props.location} />;
    }

    return this.props.children;
  }
}

function ShopMap({ location }) {
  const position = [location.latitude, location.longitude];

  return (
    <div className="visit-map">
      <MapErrorBoundary location={location}>
        <MapContainer
          center={position}
          zoom={17}
          scrollWheelZoom={false}
          zoomControl={false}
          className="shop-map"
          aria-label={`Map showing ${location.name} on ${location.address}`}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ZoomControl position="bottomright" />
          <Marker position={position} icon={shakerzMarker}>
            <Popup>
              <strong>{location.name}</strong>
              <br />
              {location.address}
            </Popup>
          </Marker>
        </MapContainer>
      </MapErrorBoundary>
    </div>
  );
}

export default ShopMap;
