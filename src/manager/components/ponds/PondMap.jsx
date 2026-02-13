import { MapContainer, TileLayer, Polygon, LayersControl } from "react-leaflet";

const { BaseLayer } = LayersControl;

const pondAreas = {
  POND_01: {
    center: [13.396210328591762, 75.00854277182263],
    polygon: [
    [13.397022064273894, 75.00766664743425],
    [13.397282986185758, 75.00775784254076],
    [13.397403010170198, 75.00792950391771],
    [13.397423883900503, 75.00818699598314],
    [13.397418665468093, 75.00868588685991],
    [13.39717339901725, 75.00891655683519],
    [13.396395850530729, 75.00918477773668],
    [13.395245178528182, 75.00931620597841],
    [13.395018174558002, 75.00928133726121],
    [13.39485640148303, 75.00821381807329],
    [13.394945115763417, 75.00802606344224],
    [13.395320846470646, 75.00782221555711],
    [13.395800945964863, 75.00772029161455],
    [13.396291481415052, 75.0076934695244],
    [13.397022064273894, 75.00766664743425],
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
