import './style.css'
import maplibregl from 'maplibre-gl'

const map = new maplibregl.Map({
  style:
      'https://api.maptiler.com/maps/01ba474a-ebfc-4c6e-8cfe-1c9f107aa977/style.json?key='+ import.meta.env.VITE_API_KEY,
  center: [-74.0066, 40.7135],
  zoom: 15.5,
  pitch: 45,
  bearing: -17.6,
  container: 'map',
  antialias: true,
  hash: true
});

map.on('load', () => {
  map.addLayer(
      {
          'id': '3d-buildings',
          'source': 'v3-openmaptiles',
          'source-layer': 'building',
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
              'fill-extrusion-color': '#8114E1',
              'fill-extrusion-opacity': 0.7,
              'fill-extrusion-height': ['get', 'render_height'],
              'fill-extrusion-base': ['get', 'render_min_height']
          }
      },
  );
});