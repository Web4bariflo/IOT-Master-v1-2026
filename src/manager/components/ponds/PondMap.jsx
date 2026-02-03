import { MapContainer, TileLayer, Polygon, LayersControl } from "react-leaflet";

const { BaseLayer } = LayersControl;

const pondAreas = {
  POND_01: {
    center: [20.26556860102388, 85.85019736493001],
    polygon: [
      [20.26575, 85.85005],
      [20.26582, 85.85025],
      [20.2656, 85.85038],
      [20.26542, 85.8503],
      [20.26538, 85.8501],
    ],
  },
};

const PondMap = ({
  selectedPondId = "POND_01",
  fullView = false,
}) => {
  const pond = pondAreas[selectedPondId];

  if (!pond) {
    return (
      <div className="h-72 border rounded flex items-center justify-center text-gray-400">
        No pond selected
      </div>
    );
  }

  return (
    <div
      className={`border rounded overflow-hidden ${
        fullView ? "h-full" : "h-72"
      }`}
    >
      <MapContainer
        center={pond.center}
        zoom={18}
        className="h-full w-full"
      >
        <LayersControl position="topright">
          <BaseLayer checked name="Street View">
            <TileLayer
              attribution="&copy; OpenStreetMap contributors"
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </BaseLayer>

          <BaseLayer name="Satellite View">
            <TileLayer
              attribution="&copy; Google"
              url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </BaseLayer>

          <BaseLayer name="Hybrid View">
            <TileLayer
              attribution="&copy; Google"
              url="https://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
              subdomains={["mt0", "mt1", "mt2", "mt3"]}
            />
          </BaseLayer>
        </LayersControl>

        <Polygon
          positions={pond.polygon}
          pathOptions={{
            color: "red",
            fillColor: "#f87171",
            fillOpacity: 0.4,
            weight: 2,
          }}
        />
      </MapContainer>
    </div>
  );
};

export default PondMap;
