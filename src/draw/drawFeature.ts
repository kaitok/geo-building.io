import { Map, MapLayerTouchEvent } from "maplibre-gl"
import pointDraw from "./drawActions/pointDraw"
import polygonDraw from "./drawActions/polygonDraw"

export default function drawFeature(map: Map, drawMode: string) {
  if (!map.getSource("draw-features")) {
    map.addSource("draw-features", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    })
  }

  if (!map.getSource("draw-features-edit")) {
    map.addSource("draw-features-edit", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [],
      },
    })
  }

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
      map.on("click", function (e: MapLayerTouchEvent) {
        if (drawMode !== "point") return
        pointDraw(map, "draw-features", e)
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
    if (!map.getLayer("draw-polygon-layer-edit")) {
      map.addLayer({
        id: "draw-polygon-layer-point-edit",
        type: "circle",
        source: "draw-features-edit",
        paint: {
          "circle-radius": 6,
          "circle-color": "#4cbb17",
        },
      })
      map.addLayer({
        id: "draw-polygon-layer-edit",
        type: "fill",
        source: "draw-features-edit",
        paint: {
          "fill-color": "#4cbb17",
          "fill-opacity": 0.5,
        },
      })
    }

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

    map.on("click", function (e: MapLayerTouchEvent) {
      if (drawMode !== "polygon") return
      pointDraw(map, "draw-features-edit", e)
      polygonDraw(map, "draw-features-edit")
    })
  }
}
