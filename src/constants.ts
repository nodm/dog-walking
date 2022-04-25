import { LngLat, LngLatBounds } from  'mapbox-gl';
import { Position } from './types/position';

export const  MAPBOX_TOKEN = '';

export const MAP_STYLE = 'mapbox://styles/mapbox/streets-v11';

export const VILNIUS_COORDINATES: Position = {
  latitude: 54.683333,
  longitude: 25.283333,
};

export const VILNIUS_BOUNDS = new LngLatBounds(
  new LngLat(25.18, 54.63),
  new LngLat(25.32, 54.78)
);

export const INITIAL_ZOOM = 10;

export const CURRENT_POSITION_ZOOM = 15;

export const ROUTS = [
  [
    [25.276731, 54.693101],
    [25.276977, 54.693042],
    [25.276304, 54.692986],
    [25.277436, 54.692968],
    [25.277621, 54.692951],
    [25.277864, 54.693182],
    [25.277511, 54.693256],
    [25.276991, 54.693300],
    [25.276731, 54.693101],
  ],
  [
    [25.273731, 54.693101],
    [25.273977, 54.693042],
    [25.274304, 54.692986],
    [25.274436, 54.692968],
    [25.274621, 54.692951],
    [25.274864, 54.693182],
    [25.274511, 54.693256],
    [25.273991, 54.693300],
    [25.273731, 54.693101],
  ],
  [
    [25.270731, 54.693101],
    [25.270977, 54.693042],
    [25.271304, 54.692986],
    [25.271436, 54.692968],
    [25.271621, 54.692951],
    [25.271864, 54.693182],
    [25.271511, 54.693256],
    [25.270991, 54.693300],
    [25.270731, 54.693101],
  ],
];

