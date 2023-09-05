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

  let features = map.querySourceFeatures('v3-openmaptiles', {sourceLayer:'building'});
  features.map((f:any) => { 
    let height = getRandomInt()
    console.log(height)
    f.properties.render_height = height
    f.properties.render_min_height = 0
  })
  console.log(features);

  map.addSource('custom-buildings', {
    type: 'geojson',
    data: {
      "type": "FeatureCollection",
      "features": features
    }
  })

  map.addLayer(
      {
          'id': '3d-buildings',
          'source': 'custom-buildings',
          'source-layer': '',
          'type': 'fill-extrusion',
          'minzoom': 10,
          'paint': {
              'fill-extrusion-color': '#8114E1',
              'fill-extrusion-opacity': 1,
              'fill-extrusion-height': ['get', 'render_height'],
              'fill-extrusion-base': ['get', 'render_min_height']
          }
      },
  );
});


function getRandomInt() {
  const randomNumber = Math.random();
  if (randomNumber < 0.05) {
    return Math.floor(Math.random() * (250 - 200 + 1)) + 200;
  } else {
    return Math.floor(Math.random() * (20 - 10 + 1)) + 10;
  }
}
