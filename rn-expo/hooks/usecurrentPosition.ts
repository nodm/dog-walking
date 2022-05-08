import { useEffect, useState } from 'react';
import { Accuracy, getCurrentPositionAsync, LocationObject, requestForegroundPermissionsAsync } from 'expo-location';

export function useCurrentPosition(accuracy: Accuracy = Accuracy.Highest): [
  LocationObject | null,
  string | null,
] {
  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      let { status } = await requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied' + status);
        return;
      }

      let location: LocationObject = await getCurrentPositionAsync({
        accuracy: Accuracy.Highest,
      });
      setLocation(location);
    })();
  }, []);

  return [location, errorMsg];
}
