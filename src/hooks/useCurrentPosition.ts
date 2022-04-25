import { useEffect, useState } from 'react';

export function useCurrentPosition(): {
  position: GeolocationPosition | null,
  error: Error | GeolocationPositionError | null,
} {
  const [position, setPosition] = useState<GeolocationPosition | null>(null);
  const [error, setError] = useState<Error | GeolocationPositionError | null>(() => {
    if (window.navigator.geolocation) return null;
    return new Error('Geolocation is not supported by your browser');
  });

  useEffect(() => {
    if (error) return;

    window.navigator.geolocation.getCurrentPosition(
      (curPosition: GeolocationPosition) => {
        setPosition(curPosition);
        setError(null);
      },
      (error: GeolocationPositionError) => {
        setPosition(null);
        setError(error);
      },
      {
        enableHighAccuracy: true
      }
    );
  }, []);

  return { position, error };
}
