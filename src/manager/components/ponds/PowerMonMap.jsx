import {
  MapContainer,
  TileLayer,
  Polyline,
  CircleMarker,
  Marker,
  Polygon,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Import your Power Monitoring image
import PowerMonImg from "../../../assets/Images/PowerMon.png";

// 🔵 Main device icon (PowerMon Image)
const powerMonIcon = new L.Icon({
  iconUrl: PowerMonImg,
  iconSize: [20, 20],
  iconAnchor: [15, 15],
});

// ⚪ Small aeration device icon
const aerationIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828817.png",
  iconSize: [15, 15],
});

export default function PowerMonMap() {
  const center = [13.39621, 75.00854];

  // 🔴 Pond boundary
  const pondBoundary = [
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
  ];

  // 🟢 ONE vertical main pipe
  const mainPipe = [
    [13.3974, 75.0083],
    [13.3962, 75.0083],
  ];

  // 🔵 Two main devices on pipe
  const mainDevices = [
    [13.3967, 75.0083],
    [13.3964, 75.0083],
  ];

  // ⚪ Aeration devices for first main device
  const aerationDevices1 = [
    [13.3967, 75.0080],
    [13.3967, 75.0086],
    
  ];

  // ⚪ Aeration devices for second main device
  const aerationDevices2 = [
    [13.3964, 75.0080],
    [13.3964, 75.0086],
  ];

  return (
    <div className="h-[400px] w-full border rounded">
      <MapContainer center={center} zoom={18} className="h-full w-full">
        
        {/* 🛰️ Satellite Map */}
        <TileLayer
          url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
          subdomains={["mt0", "mt1", "mt2", "mt3"]}
        />

        {/* 🔴 Pond Boundary */}
        <Polygon
          positions={pondBoundary}
          pathOptions={{
            color: "red",
            weight: 3,
            fillColor: "#3b82f6",
            fillOpacity: 0.2,
          }}
        />

        {/* 🟡 Dark Vertical Line (center of pond) */}
<Polyline
  positions={[
    [13.3974, 75.0083], // TOP
    [13.3949, 75.0083], // BOTTOM
  ]}
  pathOptions={{
    color: "#111827",
    weight: 6,
  }}
/>

        {/* 🟢 Main Vertical Pipe */}
        <Polyline
          positions={mainPipe}
          pathOptions={{ color: "lime", weight: 5 }}
        />

        {/* 🔵 Main Devices (PowerMon Image) */}
        {mainDevices.map((pos, i) => (
          <Marker key={`main-${i}`} position={pos} icon={powerMonIcon} />
        ))}

        {/* 🔗 Connections from Main Device 1 */}
        {aerationDevices1.map((pos, i) => (
          <Polyline
            key={`line1-${i}`}
            positions={[mainDevices[0], pos]}
            pathOptions={{ color: "yellow", weight: 3 }}
          />
        ))}

        {/* 🔗 Connections from Main Device 2 */}
        {aerationDevices2.map((pos, i) => (
          <Polyline
            key={`line2-${i}`}
            positions={[mainDevices[1], pos]}
            pathOptions={{ color: "yellow", weight: 3 }}
          />
        ))}

        {/* ⚪ Aeration Devices */}
        {aerationDevices1.map((pos, i) => (
          <Marker key={`a1-${i}`} position={pos} icon={aerationIcon} />
        ))}

        {aerationDevices2.map((pos, i) => (
          <Marker key={`a2-${i}`} position={pos} icon={aerationIcon} />
        ))}

        {/* ⚪ Optional Joint Points */}
        {[...aerationDevices1, ...aerationDevices2].map((pos, i) => (
          <CircleMarker
            key={`joint-${i}`}
            center={pos}
            radius={3}
            pathOptions={{
              color: "white",
              fillColor: "white",
              fillOpacity: 1,
            }}
          />
        ))}
      </MapContainer>
    </div>
  );
}