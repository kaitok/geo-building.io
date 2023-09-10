import './style.css'
import maplibregl, { Map, MapGeoJSONFeature } from 'maplibre-gl'
import { FeatureCollection } from './type/geojson'


const map:Map = new maplibregl.Map({
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
    f.properties.render_height
    f.properties.render_min_height
  })

  map.addSource('custom-buildings', {
    type: 'geojson',
    data: {
      "type": "FeatureCollection",
      "features": features
    }
  })

  map.addLayer(
      {
          'id': 'custom-buildings',
          'source': 'custom-buildings',
          'source-layer': '',
          'type': 'fill-extrusion',
          'minzoom': 10,
          'paint': {
              'fill-extrusion-color': 'grey',
              'fill-extrusion-opacity': 1,
              'fill-extrusion-height': ['get', 'render_height'],
              'fill-extrusion-base': ['get', 'render_min_height']
          }
      },
  );

  let data:FeatureCollection = { type: "FeatureCollection", features: [] }
  map.addSource('selected-building', { type: 'geojson', data: data });
  map.addLayer(
    {
        'id': 'selected-building',
        'source': 'selected-building',
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

  map.on('click', 'custom-buildings', (e)=> {
    data.features = []
    map.getSource('selected-building')?.setData(data)

    const features:MapGeoJSONFeature[] = map.queryRenderedFeatures(e.point)
    let featuresEl:HTMLElement | null = document.getElementById('features')
    let featuresList:string = ''

    features?.map((v: MapGeoJSONFeature)=> {
      if(v.layer.id === 'custom-buildings'){
        data.features.push(v)
        featuresList = JSON.stringify(v)
      }
    })

    featuresEl.innerHTML = featuresList
    map.getSource('selected-building')?.setData(data)
  })

});
