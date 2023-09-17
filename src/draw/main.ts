import maplibregl, { Map } from "maplibre-gl"
import drawFeature from "./drawFeature"

export default function MaplibreDraw(map: Map) {
  map.addControl(new maplibregl.NavigationControl())
  const containerClassName = "maplibregl-ctrl-top-right"
  const container = document.querySelector(`.${containerClassName}`)
  let drawMode = ""

  if (container) {
    const control = document.createElement("div")
    control.className = "maplibregl-ctrl maplibregl-ctrl-group"

    const buttonNames = ["point", "line", "polygon", "delete"]
    buttonNames.map((buttonName) => {
      const button = document.createElement("button")
      button.textContent = buttonName
      button.addEventListener("click", function () {
        drawMode = buttonName
        drawFeature(map, drawMode)
      })
      control.appendChild(button)
    })
    container.appendChild(control)
  }

  return map
}
