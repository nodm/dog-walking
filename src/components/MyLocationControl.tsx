import { useRef, useState } from 'react';
import { LatLng, LocationEvent } from 'leaflet';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import Fab from '@mui/material/Fab';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import MyLocationIcon from '@mui/icons-material/MyLocation';

import styles from './MyLocationControl.module.css';

export function MyLocationControl() {
  const [isLocating, setLocatingStatus] = useState(false);
  const locationRef = useRef<LatLng | null>(null);

  const map = useMapEvents({
    locationfound: (location: LocationEvent) => {
      locationRef.current = location.latlng;
      map.flyTo(locationRef.current, map.getMaxZoom());
      setLocatingStatus(false);
    }
  });

  const handleMovetoMyLocation = () => {
    if (isLocating) return;

    map.locate({ enableHighAccuracy: true });
    setLocatingStatus(true);
  };

  return (
    <>
      {locationRef.current && (
        <Marker position={locationRef.current}>
          <Popup>
            You are here! <br /> [{locationRef.current?.lat}, {locationRef.current?.lng}]
          </Popup>
        </Marker>
      )}
      <div className={styles.myLocationButtonContainer}>
        <Fab
          color="primary"
          aria-label="find my location"
          onClick={handleMovetoMyLocation}
        >
          {isLocating? <TravelExploreIcon /> : <MyLocationIcon />}
        </Fab>
      </div>
    </>
  );
}

export default MyLocationControl;
