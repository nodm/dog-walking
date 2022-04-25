import { useEffect, useRef, useState } from 'react';
import MapboxGL, { ScaleControl } from 'react-map-gl';
import { Map } from 'mapbox-gl';
import Fab from '@mui/material/Fab';
import StopIcon from '@mui/icons-material/Stop';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

import {
  CURRENT_POSITION_ZOOM,
  MAP_STYLE,
  MAPBOX_TOKEN,
  VILNIUS_BOUNDS,
} from '../constants';
import { useCurrentPosition } from '../hooks/useCurrentPosition';
import { WalkingRoute } from './WalkingRoute';

const initialViewState = {
  zoom: CURRENT_POSITION_ZOOM,
  // minZoom: INITIAL_ZOOM,
  // maxZoom: INITIAL_ZOOM,
  maxBounds: VILNIUS_BOUNDS,
};

export function RouteRecorderMap() {
  const { position: initialPosition } = useCurrentPosition();
  const [isRecording, toggleRecording] = useState<boolean>(false);
  const [routePoints, setRoutePoints] = useState<[number, number][]>([]);

  const mapRef = useRef(null);

  useEffect(() => {
    if(!isRecording || !window.navigator.geolocation) {
      return;
    }

    const watcherId = window.navigator.geolocation.watchPosition(
      (position: GeolocationPosition): void => {
        const { coords: { longitude, latitude } } = position;
        setRoutePoints(route => ([...route, [longitude, latitude]]));
      },
      (error: GeolocationPositionError): void => {
        console.error(error);
      },
      {
        enableHighAccuracy: true
      }
    );

    return () => {
      window.navigator.geolocation.clearWatch(watcherId);
    };
  }, [isRecording]);

  useEffect(() => {
    if (!routePoints.length || !mapRef?.current) {
      return;
    }

    const currentPoint = routePoints[routePoints.length - 1];
    const map: Map = mapRef.current;

    map.setCenter(currentPoint);
    map.zoomTo(CURRENT_POSITION_ZOOM);
  }, [routePoints]);


  const handleToggleRecording = () => {
    toggleRecording(isOn => !isOn);
  }

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      {initialPosition ? (
          <>
            <MapboxGL
              ref={mapRef}
              initialViewState={{
                ...initialViewState,
                longitude: initialPosition.coords.longitude,
                latitude: initialPosition.coords.latitude,
              }}
              style={{width: '100%', height: '100%'}}
              mapStyle={MAP_STYLE}
              mapboxAccessToken={MAPBOX_TOKEN}
            >
              <WalkingRoute id={0} coordinates={routePoints}/>
              <ScaleControl />
            </MapboxGL>

            <Fab style={{ position: 'absolute', bottom: '1rem', right: '1rem' }}
                 color={isRecording ? 'secondary' : 'primary'}
                 aria-label={`${isRecording ? 'stop' : 'start'} recording`}
                 onClick={handleToggleRecording}
            >
              {isRecording ? <StopIcon /> : <FiberManualRecordIcon />}
            </Fab>
          </>
      ) : (
        <span>Loading initial position...</span>
      )}
    </div>
  );
}

export default RouteRecorderMap;
