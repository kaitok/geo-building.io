import "./style.css"
import maplibregl, { Feature, Map, MapGeoJSONFeature } from "maplibre-gl"
import { FeatureCollection } from "./type/geojson"
import { JSONEditor } from "vanilla-jsoneditor"
import MaplibreDraw from "./draw/main"

window.onload = () => {
  const map: Map = new maplibregl.Map({
    style:
      "https://api.maptiler.com/maps/01ba474a-ebfc-4c6e-8cfe-1c9f107aa977/style.json?key=" +
      import.meta.env.VITE_API_KEY,
    center: [-74.0066, 40.7135],
    zoom: 15.5,
    pitch: 45,
    bearing: -17.6,
    container: "map",
    antialias: true,
    hash: true,
  })

  MaplibreDraw(map)

  map.on("draw.create", function (e) {
    console.log(e.drawMode)
  })

  map.on("load", () => {
    let features = map.querySourceFeatures("v3-openmaptiles", {
      sourceLayer: "building",
    })
    features.map((f: any) => {
      f.properties.render_height
      f.properties.render_min_height
    })

    map.addSource("custom-buildings", {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: features,
      },
    })

    map.addLayer({
      id: "custom-buildings",
      source: "custom-buildings",
      "source-layer": "",
      type: "fill-extrusion",
      minzoom: 10,
      paint: {
        "fill-extrusion-color": "grey",
        "fill-extrusion-opacity": 0.5,
        "fill-extrusion-height": ["get", "render_height"],
        "fill-extrusion-base": ["get", "render_min_height"],
      },
    })

    let data: FeatureCollection = { type: "FeatureCollection", features: [] }
    map.addSource("selected-building", { type: "geojson", data: data })
    map.addLayer({
      id: "selected-building",
      source: "selected-building",
      "source-layer": "",
      type: "fill-extrusion",
      minzoom: 10,
      paint: {
        "fill-extrusion-color": "#8114E1",
        "fill-extrusion-opacity": 1,
        "fill-extrusion-height": ["get", "render_height"],
        "fill-extrusion-base": ["get", "render_min_height"],
      },
    })

    map.on("click", "custom-buildings", (e) => {
      data.features = []
      map.getSource("selected-building")?.setData(data)
      editor.set({ json: {} })
      let featureContent = []

      const features: MapGeoJSONFeature[] = map.queryRenderedFeatures(e.point)
      features?.map((v: MapGeoJSONFeature) => {
        if (v.layer.id === "custom-buildings") {
          data.features.push(v)
          featureContent.push({
            id: v.id,
            properties: v.properties,
            geometry: v.geometry,
          })
        }
      })

      editor.set({
        json: featureContent,
      })
      map.getSource("selected-building")?.setData(data)
    })
  })

  let content = {
    json: {},
  }

  const editor = new JSONEditor({
    target: document.getElementById("features"),
    props: {
      mode: "tree",
      content,
      onChange: (
        updatedContent,
        previousContent,
        { contentErrors, patchResult }
      ) => {
        console.log("onChange", {
          updatedContent,
          previousContent,
          contentErrors,
          patchResult,
        })

        let prevMapFeatures = map.getSource("selected-building")._data
        let editMapFeatures = {
          type: "FeatureCollection",
          features: [],
        }
        prevMapFeatures.features.map((f: Feature) => {
          if (f.id === patchResult.json[0].id) {
            f.properties = patchResult.json[0].properties
          }
          editMapFeatures.features.push(f)
        })
        map.getSource("selected-building")?.setData(editMapFeatures)
      },
    },
  })
}
