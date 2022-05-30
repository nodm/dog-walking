import React, { useEffect, useRef } from 'react';
import MapboxGL, { Marker, ScaleControl } from 'react-map-gl';
import { Map } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import {
  CURRENT_POSITION_ZOOM,
  INITIAL_ZOOM,
  MAP_STYLE,
  MAPBOX_TOKEN,
  ROUTS,
  VILNIUS_COORDINATES,
} from '../constants';
import { useCurrentPosition } from '../hooks/useCurrentPosition';
import { WalkingRoute } from './WalkingRoute';

const initialViewState = {
  ...VILNIUS_COORDINATES,
  zoom: INITIAL_ZOOM ,
};

export function WalkingMap() {
  const mapRef = useRef(null);
  const { position } = useCurrentPosition();

  useEffect(() => {
    if (!position || !mapRef?.current) {
      return;
    }

    const { coords: { latitude, longitude } } = position;
    const map: Map = mapRef.current;

    map.setCenter([longitude, latitude]);
    map.zoomTo(CURRENT_POSITION_ZOOM);
  }, [position]);

  return (
    <MapboxGL ref={mapRef}
              initialViewState={initialViewState}
              style={{ width: '100%', height: '100%' }}
              mapStyle={MAP_STYLE}
              mapboxAccessToken={MAPBOX_TOKEN}
    >
      {ROUTS.map((coordinates, index) => (
        <WalkingRoute key={index} id={index} coordinates={coordinates} />
      ))}
      {position && (
        <Marker longitude={position.coords.longitude}
                latitude={position.coords.latitude}
                color="blue"
        />
      )}
      <ScaleControl />
    </MapboxGL>
  );
}

export default WalkingMap;
