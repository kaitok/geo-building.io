import { Map, MapLayerTouchEvent } from "maplibre-gl"

export default function pointDraw(map: Map, e: MapLayerTouchEvent) {
  let coordinates = e.lngLat
  let newPoint = {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [coordinates.lng, coordinates.lat],
    },
    properties: {},
  }
  let source = map.getSource("draw-features")
  let data = source._data
  data.features.push(newPoint)
  source.setData(data)
}
