import "ol/ol.css";
import Map from "ol/Map";
import Overlay from "ol/Overlay";
import TileLayer from "ol/layer/Tile";
import View from "ol/View";
import XYZ from "ol/source/XYZ";
import { toLonLat } from "ol/proj";
import { toStringHDMS } from "ol/coordinate";

const container = document.getElementById("popup");
const content = document.getElementById("popup-content");
const closer = document.getElementById("popup-closer");

const overlay = new Overlay({
  element: container
});

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

const key = "jVSkcydrsJ2jf5844AOu";
const attributions =
  '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> ' +
  '<a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>';

const map = new Map({
  layers: [
    new TileLayer({
      source: new XYZ({
        attributions: attributions,
        url: "https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=" + key,
        tileSize: 512
      })
    })
  ],
  overlays: [overlay],
  target: "map",
  view: new View({
    center: [0, 0],
    zoom: 4
  })
});

map.on("singleclick", function (evt) {
  const coordinate = evt.coordinate;
  const coord = toLonLat(coordinate).toString();

  content.innerHTML = `<p>Você clicou em:</p>
  <p>Longitude: <code>${coordinate[0]}</code></p>
  <p>Latitude: <code>${coordinate[1]}</code></p>
  <button class="btn btn-primary" onclick="insert('${coord}')">Salvar</button>`;
  overlay.setPosition(coordinate);
});