import { useEffect, useState } from 'react';
import { LocationAccuracy, LocationObject, LocationSubscription, watchPositionAsync } from 'expo-location';

const enum TrackerMode {
  idle = 0,
  tracking = 1,
  paused = 2,
}

export function useTracking(): [
  LocationObject[],
  () => void,
  () => void,
  () => void,
] {
  const [mode, setMode] = useState<TrackerMode>(TrackerMode.idle);
  const [track, setTrack] = useState<LocationObject[]>([]);

  const startTracking = (): void => {
    setMode((curMode) => {
      return curMode === TrackerMode.idle || curMode === TrackerMode.paused ? TrackerMode.tracking : curMode;
    });
  };
  const pauseTracking = (): void => {
    setMode((curMode) => {
      return curMode === TrackerMode.tracking ? TrackerMode.paused : curMode;
    });
  };
  const stopTracking = (): void => {
    setMode((curMode) => {
      return curMode === TrackerMode.tracking || curMode === TrackerMode.paused ? TrackerMode.idle : curMode;
    });
  };

  useEffect(() => {
    console.log('>>>', 'useTracking::useEffect', 'mode', mode);
    if (mode !== TrackerMode.tracking) return;

    let locationSubscription: LocationSubscription;

    (async () => {
      locationSubscription = await watchPositionAsync(
        {
          accuracy: LocationAccuracy.Highest,
          distanceInterval: 1,
          mayShowUserSettingsDialog: true,
        },
        (location) => {
          setTrack(curTrack => [...curTrack, location]);
        });
      console.log('>>>', 'useTracking::useEffect', 'subscribed', 'mode', mode);
    })();

    // return () => locationSubscription?.remove();
    return () => {
      console.log('>>>', 'useTracking::useEffect', 'unsubscribe', 'mode', mode);
      locationSubscription?.remove();
    }
  }, [mode]);

  return [
    track,
    startTracking,
    pauseTracking,
    stopTracking,
  ];
}
