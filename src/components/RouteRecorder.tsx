import { useEffect, useState } from 'react';
import { LatLngExpression, LatLngTuple } from 'leaflet';
import { Polyline } from 'react-leaflet';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import PauseIcon from '@mui/icons-material/Pause';

import styles from './RouteRecorder.module.css';


const useWalkingRoute = (initialRoute: LatLngTuple[] = []) => {
  const [walkingRoute, setWalkingRoute] = useState<LatLngTuple[]>(initialRoute);
  const addPoint = ([lat, lng]: LatLngTuple): void => {
    if (walkingRoute.length) {
      const [prevLat, prevLng] = walkingRoute[walkingRoute.length - 1];
      if (prevLat === lat && prevLng === lng) return;
    }

    setWalkingRoute(curRoute => [...curRoute, [lat, lng]]);
  };

  return [walkingRoute, addPoint];
};

export function RouteRecorder() {
  const [isRecording, toggleRecording] = useState<boolean>(false);
  const [walkingRoute, addWalkingPoint] = useWalkingRoute();

  useEffect(() => {
    if(!isRecording || !window.navigator.geolocation) {
      return;
    }

    const watcherId = window.navigator.geolocation.watchPosition(
      (position: GeolocationPosition): void => {
        const { coords: { longitude, latitude } } = position;
        const walkingPoint = [latitude, longitude] as LatLngTuple;
        // @ts-ignore
        addWalkingPoint(walkingPoint);
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
  }, [isRecording, addWalkingPoint]);

  const handleRouteRecording = () => {
    toggleRecording(isRecordingInProgress => !isRecordingInProgress);
  };

  return (
    <>
      <Polyline pathOptions={{ color: 'blue' }} positions={walkingRoute as LatLngExpression[]} />
      <div className={styles.routeRecordingButtonContainer}>
        <Fab
          color="primary"
          aria-label="find my location"
          onClick={handleRouteRecording}
        >
          {isRecording ? <PauseIcon /> : <AddIcon />}
        </Fab>
      </div>
    </>
  );
}

export default RouteRecorder;
