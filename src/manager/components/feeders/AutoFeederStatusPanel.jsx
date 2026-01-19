import { useState, useEffect } from "react";
import Feeder from "../../../assets/Images/FeedersActive.png";
import React from "react";
import { MQTT_TOPICS } from "../../../mqtt/mqttTopics";
import { FEEDER_LIST } from "../../services/feeders";
import { useMqtt } from "../../../context/MqttContext";

const AutoFeederStatusPanel = () => {
  const { client, isConnected } = useMqtt();
  const [activeTab, setActiveTab] = useState("all");

  // 🔹 Device state owned here
  const [devices, setDevices] = useState(() =>
    FEEDER_LIST.map((d) => ({
      id: d.id,
      name: d.name,

      // MQTT-driven
      alive: false,
      online: false,
      battery: 0,
      signal: 0,
      alert: false,
      lastSeen: null,
    })),
  );

  // 🔹 MQTT subscription
  useEffect(() => {
    if (!client || !isConnected) return;

    console.log("📡 Subscribing feeder status topics");

    devices.forEach((d) => {
      client.subscribe(MQTT_TOPICS.ALIVE(d.id));
      client.subscribe(MQTT_TOPICS.BATTERY(d.id));
      client.subscribe(MQTT_TOPICS.ALERT(d.id));
      client.subscribe(MQTT_TOPICS.ONLINE(d.id));
    });

    const onMessage = (topic, payload) => {
      const msg = payload.toString();
      const match = topic.match(/(auto_feeder|bms)\/(\d+)\//);
      if (!match) return;

      const id = match[2];

      setDevices((prev) =>
        prev.map((d) => {
          if (d.id !== id) return d;

          if (topic.includes("/system/alive")) {
            return {
              ...d,
              alive: true,
              online: true,
              signal: 5,
              lastSeen: Date.now(),
            };
          }

          if (topic.includes("/system/battery")) {
            return { ...d, battery: Number(msg) };
          }

          if (topic.includes("/system/alert")) {
            return { ...d, alert: true };
          }

          if (topic.includes("/bms/online")) {
            return { ...d, online: msg === "1" };
          }

          return d;
        }),
      );
    };

    client.on("message", onMessage);

    return () => {
      client.off("message", onMessage);
    };
  }, [client, isConnected]);

  const filteredDevices =
    activeTab === "all"
      ? devices
      : activeTab === "online"
        ? devices.filter((d) => d.online && !d.alert)
        : devices.filter((d) => d.alert || !d.alive);

  const renderDeviceCard = (d) => {
    const batteryColor =
      d.battery > 50
        ? "text-green-600"
        : d.battery > 20
          ? "text-orange-500"
          : "text-red-500";

    return (
      <div
        key={d.id}
        className={`relative flex items-center gap-3 p-3 rounded-lg bg-white border ${
          d.alert ? "border-red-300 bg-red-50" : "border-gray-200"
        }`}
      >
        {/* ICON */}
        <div className="w-10 h-10">
          <img src={Feeder} alt="feeder" className="w-8 h-8" />
        </div>

        {/* DETAILS */}
        <div className="flex-1">
          <div className="text-sm font-semibold text-gray-800">{d.id}</div>

          <div className="flex items-center mt-1">
            {/* Battery */}
            <div className={`flex items-center gap-1 ${batteryColor}`}>
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <rect x="2" y="6" width="18" height="12" rx="2" />
                <rect x="20" y="10" width="2" height="4" rx="1" />
              </svg>
              <span className="text-xs font-medium">{d.battery}%</span>
            </div>

            {/* SIGNAL */}
            <div className="flex gap-0.5 ml-auto">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-3 rounded-sm ${
                    i < d.signal ? "bg-green-500" : "bg-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ALERT DOT */}
        {d.alert && (
          <div className="absolute top-2 right-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
            </span>
          </div>
        )}
      </div>
    );
  };

   return (
    <div className="w-80 bg-white border rounded-xl shadow-sm overflow-hidden font-sans">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-green-50 border-b">
        <h3 className="text-sm font-semibold text-gray-800">
          Auto Feeders – Pond 1
        </h3>
      </div>

      {/* TABS */}
      <div className="flex text-xs font-medium text-gray-500 border-b">
        {["all", "online", "alert"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* DEVICE LIST */}
      <div className="p-3 space-y-2 bg-gray-50">
        {filteredDevices.map(renderDeviceCard)}
      </div>
    </div>
  );
};

export default AutoFeederStatusPanel;



