import './style.css'
import maplibregl from 'maplibre-gl'

const map = new maplibregl.Map({
  style:
      'https://api.maptiler.com/maps/streets/style.json?key='+ import.meta.env.VITE_API_KEY,
  center: [-74.0066, 40.7135],
  zoom: 15.5,
  pitch: 45,
  bearing: -17.6,
  container: 'map',
  antialias: true
});

map.on('load', () => {

});