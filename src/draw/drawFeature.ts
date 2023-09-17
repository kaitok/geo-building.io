import { Map } from "maplibre-gl"
import pointDraw from "./drawActions/pointDraw"

export default function drawFeature(map: Map, drawMode: string) {
  map.addSource("draw-features", {
    type: "geojson",
    data: {
      type: "FeatureCollection",
      features: [],
    },
  })

  if (drawMode === "point") {
    if (!map.getLayer("draw-point-layer")) {
      map.addLayer({
        id: "draw-point-layer",
        type: "circle",
        source: "draw-features",
        paint: {
          "circle-radius": 6,
          "circle-color": "#3170c9",
        },
      })
      map.on("click", function (e) {
        pointDraw(map, e)
      })
    }
  } else if (drawMode === "line") {
    if (!map.getLayer("draw-line-layer")) {
      map.addLayer({
        id: "draw-line-layer",
        type: "line",
        source: "draw-features",
        paint: {
          "line-color": "#3170c9",
          "line-width": 3,
        },
      })
    }
  } else if (drawMode === "polygon") {
    if (!map.getLayer("draw-polygon-layer")) {
      map.addLayer({
        id: "draw-polygon-layer",
        type: "fill",
        source: "draw-features",
        paint: {
          "fill-color": "#3170c9",
          "fill-opacity": 0.5,
        },
      })
    }
  }

  map.fire("draw.create", { drawMode })
}
