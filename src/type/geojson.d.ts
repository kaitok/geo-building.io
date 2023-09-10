import { MapGeoJSONFeature } from "maplibre-gl";

export interface FeatureCollection {
  type: "FeatureCollection";
  features: MapGeoJSONFeature[];
}