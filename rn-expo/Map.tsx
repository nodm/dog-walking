import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import MapView, { Polyline } from 'react-native-maps';

import { useCurrentPosition } from './hooks/usecurrentPosition';
import { useTracking } from './hooks/useTracking';

export default function Map() {
  // const [location, errorMsg ] = useCurrentPosition();
  const [track, startTracking, pauseTracking, stopTracking] = useTracking();

  console.log(track.length);
  React.useEffect(() => {
    startTracking();
    setTimeout(() => {
      console.log('>>>', 'Stop tracking');
      stopTracking();
    }, 60000);
  }, [])

  const coordinates = track.map(({ coords: { latitude, longitude } }) => ({ latitude, longitude }));

  return (
    <View style={styles.container}>
      <MapView style={styles.map}
               showsUserLocation={true}
               followsUserLocation={true}
               showsScale={true}
               showsCompass={true}
               showsBuildings={true}
               showsTraffic={true}
      >
        {!!track.length && (
          <Polyline coordinates={coordinates}
                    strokeWidth={3}
                    strokeColor="blue"
          />
        )}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
