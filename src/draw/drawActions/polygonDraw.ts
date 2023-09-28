import { Map } from "maplibre-gl"
import * as turf from "@turf/turf"

export default function polygonDraw(map: Map, soruceId: string) {
  let source = map.getSource(soruceId)
  let data = source._data
  let bbox = turf.bbox(data)
  let bboxPolygon = turf.bboxPolygon(bbox)
  data.features.push(bboxPolygon)
  console.log(bboxPolygon)
  source.setData(data)
}
