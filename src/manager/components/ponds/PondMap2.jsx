
import {
    MapContainer,
    TileLayer,
    Polygon,
    LayersControl,
    Marker,
    Popup,
    Polyline
} from "react-leaflet";
import L from "leaflet";

import powerImg from "../../../assets/Images/PowerMon.png";
import aerationImg from "../../../assets/Images/aeration device.png";

const { BaseLayer } = LayersControl;

// ✅ Icons
const powerIcon = new L.Icon({
    iconUrl: powerImg,
    iconSize: [35, 35],
});

const aerationIcon = new L.Icon({
    iconUrl: aerationImg,
    iconSize: [25, 25],
});

// ✅ Pond Data
const pondAreas = {
    POND_01: {
        center: [13.3962103, 75.0085427],

        polygon: [
            [13.397022, 75.007666],
            [13.397282, 75.007757],
            [13.397403, 75.007929],
            [13.397423, 75.008186],
            [13.397418, 75.008685],
            [13.397173, 75.008916],
            [13.396395, 75.009184],
            [13.395245, 75.009316],
            [13.395018, 75.009281],
            [13.394856, 75.008213],
            [13.394945, 75.008026],
            [13.395320, 75.007822],
            [13.395800, 75.007720],
            [13.396291, 75.007693],
            [13.397022, 75.007666],
        ],

        devices: [
            // 🔵 POWER DEVICE ON BORDER (picked from polygon edge)
            {
                id: "PM_1",
                type: "power",
                position: [13.396522, 75.007666], // 👉 exact border point
                status: "online",
            },

            // 🟢 Aeration inside pond
            {
                id: "AER_1",
                type: "aeration",
                position: [13.3967, 75.0080],
                status: "online",
            },
            {
                id: "AER_2",
                type: "aeration",
                position: [13.3965, 75.0088],
                status: "online",
            },
            {
                id: "AER_3",
                type: "aeration",
                position: [13.3958, 75.0080],
                status: "online",
            },
            {
                id: "AER_4",
                type: "aeration",
                position: [13.3956, 75.0088],
                status: "online",
            },
        ],
    },
};

const PondMap = ({ selectedPondId = "POND_01" }) => {
    const pond = pondAreas[selectedPondId];

    if (!pond) return <div>No pond found</div>;

    const powerDevice = pond.devices.find(d => d.type === "power");

    return (
        <div className="h-72 border rounded overflow-hidden">
            <MapContainer center={pond.center} zoom={18} className="h-full w-full">

                {/* Layers */}
                <LayersControl position="topright">
                    <BaseLayer checked name="Street">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </BaseLayer>

                    <BaseLayer name="Satellite">
                        <TileLayer
                            url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                            subdomains={["mt0", "mt1", "mt2", "mt3"]}
                        />
                    </BaseLayer>
                </LayersControl>

                {/* Pond */}
                <Polygon
                    positions={pond.polygon}
                    pathOptions={{
                        color: "red",
                        fillOpacity: 0.3,
                    }}
                />

                {/* ✅ Devices */}
                {pond.devices.map((device, i) => {
                    const icon = device.type === "power" ? powerIcon : aerationIcon;

                    return (
                        <Marker key={i} position={device.position} icon={icon}>
                            <Popup>
                                <b>{device.id}</b><br />
                                Type: {device.type}<br />
                                Status:
                                <span style={{ color: device.status === "online" ? "green" : "red" }}>
                                    {" "}{device.status}
                                </span>
                            </Popup>
                        </Marker>
                    );
                })}

                {/* ✅ CONNECTION LINES (FROM BORDER TO INSIDE) */}
                {powerDevice &&
                    pond.devices
                        .filter(d => d.type === "aeration")
                        .map((aer, i) => {

                            const p = powerDevice.position;
                            const a = aer.position;

                            // 🔥 Pipe routing (nice structure)
                            const mid1 = [p[0] - 0.0002, p[1]]; // go inside pond
                            const mid2 = [mid1[0], a[1]]; // horizontal to device

                            return (
                                <Polyline
                                    key={i}
                                    positions={[p, mid1, mid2, a]}
                                    pathOptions={{
                                        color: aer.status === "online" ? "green" : "gray",
                                        weight: 3,
                                    }}
                                />
                            );
                        })}
            </MapContainer>
        </div>
    );
};

export default PondMap;