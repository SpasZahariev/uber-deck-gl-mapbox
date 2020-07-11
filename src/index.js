import mapStyles from "./mapStyles.js";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HexagonLayer, HeatmapLayer } from "@deck.gl/aggregation-layers";
import { GoogleMapsOverlay } from "@deck.gl/google-maps";

//anytime the map changes -> rebuild the entire deck.gl map
const scatterpolt = () =>
  new ScatterplotLayer({
    id: "scatter",
    data: "./gross_rent.json",
    opacity: 0.7,
    filled: true,
    radiusMinPixels: 2,
    radiusMaxPixels: 5,
    getPosition: (datasetObject) => [datasetObject.Lon, datasetObject.Lat],
    getFillColor: (datasetObject) =>
      datasetObject.Median > 1000 ? [152, 115, 191, 150] : [89, 125, 89, 100],
  });

const heatmap = () =>
  new HeatmapLayer({
    id: "heat",
    data: "./gross_rent.json",
    getPosition: (datasetObject) => [datasetObject.Lon, datasetObject.Lat],
    getWeight: (datasetObject) => datasetObject.Median,
    radiusPixels: 30,
  });

const validLatitude = (lat) => {
  if (lat <= -90 || lat >= 90) {
    return 0;
  } else {
    return lat;
  }
};

const hexagon = () =>
  new HexagonLayer({
    id: "hex",
    data: "./gross_rent.json",
    getPosition: (datasetObject) => [
      datasetObject.Lon,
      validLatitude(datasetObject.Lat),
    ],
    getElevationWeight: (datasetObject) => datasetObject.Median / 100,
    elevationScale: 100,
  });

window.initMap = () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 40.0, lng: -100.0 },
    zoom: 5,
    styles: mapStyles,
  });

  const overlay = new GoogleMapsOverlay({
    layers: [
      // scatterpolt(),
      heatmap(),
      // hexagon(),
    ],
  });

  overlay.setMap(map);
};
