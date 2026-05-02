import { useState, useEffect } from "react";
import { useMqtt } from "../../../context/MqttContext";
import useDashboardData from "../../hooks/useDashboardData";

const rssiToBars = (rssi) => {
    if (rssi > -60) return 5;
    if (rssi > -70) return 4;
    if (rssi > -80) return 3;
    if (rssi > -90) return 2;
    return 1;
};

const pondId = Number(localStorage.getItem("activePond"));

const DeviceStatusPanel = ({ config, feederImage }) => {
    const { deviceStatus, client, isConnected } = useMqtt();
    const { devices, loading } = useDashboardData(pondId, config.deviceType);
    console.log("Devices:", devices);

    const [activeTab, setActiveTab] = useState("all");
    const [onlineMap, setOnlineMap] = useState({});

    useEffect(() => {
        if (!client || !isConnected || devices.length === 0) return;

        devices.forEach((d) => {
            if (config.topic === "auto_feeder") {
                client.subscribe(`${config.topic}/${d.device_id}/system/alive`);
            }

            if (config.topic === "bms") {
                client.subscribe([
                    `bms/${d.device_id}/online`,
                    `bms/${d.device_id}/battery_state`,
                ]);
            }

            // ✅ ADD THIS BLOCK
            if (config.topic === "pomon") {
                client.subscribe(`pomon/${d.device_id}/heartbeat`);
            }
        });
    }, [client, isConnected, devices, config.topic]);

    const feeders = devices.map((d) => {
        const mqtt = deviceStatus[d.device_id] || {};

        const isOnline = mqtt.online;

        return {
            id: d.device_id,
            battery: mqtt?.battery ?? "--",
            status: isOnline ? (mqtt.alert ? "alert" : "online") : "offline",
            signal:
                typeof mqtt?.rssi === "number"
                    ? rssiToBars(mqtt.rssi)
                    : isOnline
                        ? 4
                        : 0,
        };
    });

    const filtered =
        activeTab === "all"
            ? feeders
            : feeders.filter((f) => f.status === activeTab);

    if (loading) return <div>Loading...</div>;

    return (
        <div className="w-80 bg-white border rounded-xl shadow-sm overflow-hidden">

            {/* HEADER */}
            <div className="px-4 py-3 bg-green-50 border-b">
                <h3 className="text-sm font-semibold">
                    {config.title} – Pond 1
                </h3>
            </div>

            {/* TABS */}
            <div className="flex text-xs border-b">
                {["all", "online", "alert"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`flex-1 py-2 ${activeTab === tab ? "text-blue-600 border-b-2 border-blue-600" : ""
                            }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* LIST */}
            <div className="p-3 space-y-2 bg-gray-50">
                {filtered.map((f) => {
                    const batteryColor =
                        f.battery > 50
                            ? "text-green-600"
                            : f.battery > 20
                                ? "text-orange-500"
                                : "text-red-500";

                    return (
                        <div
                            key={f.id}
                            className={`relative flex items-center gap-3 p-3 rounded-lg bg-white border ${f.status === "alert"
                                    ? "border-red-300 bg-red-50"
                                    : "border-gray-200"
                                }`}
                        >
                            {/* ICON */}
                            <div className="w-10 h-10">
                                <img src={feederImage} alt="device" className="w-8 h-8" />
                            </div>

                            {/* DETAILS */}
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <div className="text-sm font-semibold text-gray-800">
                                        {f.id}
                                    </div>

                                    <span
                                        className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${f.status === "online"
                                                ? "bg-green-100 text-green-700"
                                                : f.status === "alert"
                                                    ? "bg-red-100 text-red-700"
                                                    : "bg-gray-200 text-gray-600"
                                            }`}
                                    >
                                        {f.status === "online"
                                            ? "Active"
                                            : f.status === "alert"
                                                ? "Alert"
                                                : "Offline"}
                                    </span>
                                </div>

                                <div className="flex items-center mt-1">
                                    {/* Battery */}
                                    {config.hasBattery && (
                                        <div className={`flex items-center gap-1 ${batteryColor}`}>
                                            <svg
                                                className="w-4 h-4"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                            >
                                                <rect x="2" y="6" width="18" height="12" rx="2" />
                                                <rect x="20" y="10" width="2" height="4" rx="1" />
                                            </svg>
                                            <span className="text-xs font-medium">
                                                {f.battery}%
                                            </span>
                                        </div>
                                    )}

                                    {/* SIGNAL */}
                                    {config.hasSignal && (
                                        <div className="flex gap-0.5 ml-auto">
                                            {[...Array(5)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className={`w-1.5 h-3 rounded-sm ${i < f.signal
                                                            ? "bg-green-500"
                                                            : "bg-gray-300"
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* ALERT BLINK */}
                            {f.status === "alert" && (
                                <div className="absolute top-2 right-2">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                                    </span>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default DeviceStatusPanel;