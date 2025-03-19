import React, { useEffect } from 'react';
import maplibregl from 'maplibre-gl';

const MapComponent = ({ coordinates }) => {
  console.log(process.env.REACT_APP_MAP_KEY)
  useEffect(() => {
    const map = new maplibregl.Map({
      container: 'map', 
      style: `https://api.maptiler.com/maps/streets/style.json?key=${process.env.REACT_APP_MAP_KEY}`, 
      center: coordinates[0], 
      zoom: 5,
    });

    map.on('load', () => {
      map.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      });

      map.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#888',
          'line-width': 4,
        },
      });
    });

    return () => map.remove();
  }, [coordinates]);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapComponent;