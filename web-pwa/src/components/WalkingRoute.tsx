import React from 'react';
import { Layer, LayerProps, Source, SourceProps } from 'react-map-gl';


export function WalkingRoute({ id, coordinates }: { id: number, coordinates: number[][] }) {

  // const geojson = {
  //   type: 'FeatureCollection',
  //   // features: [
  //   //   {type: 'Feature', geometry: {type: 'Point', coordinates: [-122.4, 37.8]}}
  //   // ],
  //   features: coordinates.map((coordinates) => ({
  //     type: 'Feature',
  //     geometry: {
  //       type: 'Point',
  //       coordinates,
  //     },
  //   })),
  // };

  // const layerStyle = {
  //   id: 'point',
  //   type: 'circle',
  //   paint: {
  //     'circle-radius': 10,
  //     'circle-color': '#007cbf'
  //   }
  // };


  const routeSource: SourceProps = {
    type: 'geojson',
    data: {
      'type': 'Feature',
      'properties': {},
      'geometry': {
        'type': 'LineString',
        coordinates
      }
    },
  };

  const routeLayer: LayerProps = {
    'id': 'route' + id,
    'type': 'line',
    'source': 'route',
    'layout': {
      'line-join': 'round',
      'line-cap': 'round'
    },
    'paint': {
      'line-color': 'blue',
      'line-width': 3
    }
  };

  return (
    <Source id={'route'  + id} {...routeSource }>
      <Layer {...routeLayer} />
    </Source>
  );
}

export default WalkingRoute;
