import maplibregl, { Map, MapLayerMouseEvent } from "maplibre-gl"
import drawFeature from "./drawFeature"
import "./styles/style.css"

export default function MaplibreDraw(map: Map) {
  map.addControl(new maplibregl.NavigationControl())

  const containerClassName = "maplibregl-ctrl-top-right"
  const container = document.querySelector(`.${containerClassName}`)
  let activeButton: HTMLButtonElement | null = null

  if (container) {
    const control = document.createElement("div")
    control.className = "maplibregl-ctrl maplibregl-ctrl-group"

    const buttonNames = ["point", "line", "polygon", "delete"]
    let drawMode = ""

    buttonNames.forEach((buttonName) => {
      const button = document.createElement("button")
      button.textContent = buttonName
      button.className = "maplibregl-ctrl-draw-btn"
      control.appendChild(button)

      button.addEventListener("click", function (e) {
        if (activeButton && activeButton !== e.target) {
          activeButton.classList.remove("active")
        }

        e.target.classList.toggle("active")
        activeButton = e.target as HTMLButtonElement
        drawMode = buttonName
        drawFeature(map, drawMode)
      })
    })

    container.appendChild(control)
  }

  return map
}
