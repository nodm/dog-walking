import { useEffect } from 'react';
import { LatLngBoundsLiteral } from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet';

import MyLocationControl from './MyLocationControl';
import RouteRecorder from './RouteRecorder';
import styles from './LeafletMap.module.css';


const LITHUANIAN_BOUNDARIES: LatLngBoundsLiteral = [
  [56.490639, 20.790763],
  [53.765776, 26.876487]
];

export function LeafletMap() {
  useEffect(() => {
    console.log('>>>', 'LeafletMap :: rendered');
  });

  return (
    <div className={styles.mapContainer}>
      <MapContainer bounds={LITHUANIAN_BOUNDARIES}
                    scrollWheelZoom={true}
                    className={styles.leafletContainer}
      >
        <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MyLocationControl />
        <RouteRecorder />
      </MapContainer>
    </div>
  );
}

export default LeafletMap;
