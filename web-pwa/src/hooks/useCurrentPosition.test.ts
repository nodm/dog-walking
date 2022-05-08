import { renderHook } from '@testing-library/react-hooks';
import { useCurrentPosition } from './useCurrentPosition';

describe('Test useCurrentPosition hook', () => {
  let windowGetter: jest.SpyInstance<Partial<Navigator>>;

  beforeEach(() => {
    windowGetter = jest.spyOn(window, 'navigator', 'get');
  });

  test('should set error if geolocation is not supported by the browser', () => {
    windowGetter.mockReturnValue({
      ...window.navigator,
      geolocation: undefined,
    });

    const { result } = renderHook(() => useCurrentPosition());

    expect(result.current.position).toBeNull();
    expect(result.current.error).toEqual(new Error('Geolocation is not supported by your browser'));
  });

  test('should set error on current position detection failure', async () => {
    const geolocationPositionError: GeolocationPositionError = Object.create(
      new Error('Geoposition Error Mock'),
      {
        code: { value: 1, writable: false },
        PERMISSION_DENIED: { value: 0, writable: false },
        POSITION_UNAVAILABLE: { value: 0, writable: false },
        TIMEOUT: { value: 0, writable: false },
      }
    );

    windowGetter.mockReturnValue({
      geolocation: {
        ...window.navigator?.geolocation,
        getCurrentPosition: jest.fn(
          (callback, errorCallback: (error: GeolocationPositionError) => never) => {
            queueMicrotask(() => {
              errorCallback(geolocationPositionError);
            });
          }
        ),
      },
    });

    const { result, waitForNextUpdate } = renderHook(() => useCurrentPosition());
    await waitForNextUpdate();
    expect(result.current.error).toEqual(geolocationPositionError);
  });

  test('should return null as a first value', () => {
    windowGetter.mockReturnValue({
      geolocation: {
        ...window.navigator?.geolocation,
        getCurrentPosition: jest.fn(),
      },
    });

    const { result } = renderHook(() => useCurrentPosition());
    expect(result.current.position).toBeNull();
  });

  test('should return current position after detection ends', async () => {
    const geoPositionMock: GeolocationPosition = {
      coords: {
        accuracy: 0,
        altitude: null,
        altitudeAccuracy: null,
        heading: null,
        latitude: -12.34,
        longitude: 56.7,
        speed: null,
      },
      timestamp: new Date().getTime(),
    };

    windowGetter.mockReturnValue({
      geolocation: {
        ...window.navigator?.geolocation,
        getCurrentPosition: jest.fn((callback) => {
          queueMicrotask(() => {
            callback(geoPositionMock);
          });
        }),
      },
    });

    const { result, waitForNextUpdate } = renderHook(() => useCurrentPosition());
    await waitForNextUpdate();
    expect(result.current.position).toEqual(geoPositionMock);
  });
});
