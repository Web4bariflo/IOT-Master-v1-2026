// import React, { createContext, useEffect, useState, useContext } from "react";
// import mqtt from "mqtt";
// import { MQTT_TOPICS } from "../mqtt/mqttTopics";

// export const MqttContext = createContext(null);

// export const MqttProvider = ({ children }) => {
//   const [client, setClient] = useState(null);
//   const [isConnected, setIsConnected] = useState(false);
//   const [deviceStatus, setDeviceStatus] = useState({});

//   useEffect(() => {
//     const mqttClient = mqtt.connect({
//       hostname: "mqttbroker.bc-pl.com",
//       port: 443,
//       protocol: "wss",
//       path: "/mqtt",
//       username: "mqttuser",
//       password: "Bfl@2025",
//       reconnectPeriod: 3000,
//       keepalive: 60,
//     });

//     mqttClient.on("connect", () => {
//       setIsConnected(true);
//       console.log("✅ MQTT connected");
//     });

//     mqttClient.on("close", () => {
//       setIsConnected(false);
//     });

//     mqttClient.on("error", (err) => {
//       console.error("❌ MQTT error:", err);
//     });

//  mqttClient.on("message", (topic, payload) => {
//   const message = payload.toString();

//   // Extract full device ID correctly
//   const match = topic.match(/auto_feeder\/(.+)\/system/);
//   if (!match) return;

//   const deviceId = match[1];

//   setDeviceStatus((prev) => {
//     const updated = { ...prev };

//     updated[deviceId] = updated[deviceId] || {
//       online: false,
//       battery: null,
//       alert: null,
//       lastSeen: null,
//     };

//     // 🔋 BATTERY
//     if (topic.includes("battery")) {
//       updated[deviceId].battery = Number(message);
//     }

//     // 🟢 ALIVE
//     if (topic.includes("alive")) {
//       updated[deviceId].online =
//         message.toLowerCase() === "alive" ||
//         message === "1" ||
//         message === "true";
//     }

//     // 🌐 ONLINE (if separate topic exists)
//     if (topic.includes("online")) {
//       updated[deviceId].online =
//         message === "1" || message === "true";
//     }

//     // 🔴 ALERT
//     if (topic.includes("alert")) {
//       updated[deviceId].alert =
//         message.toLowerCase() === "normal" ? null : message;
//     }

//     updated[deviceId].lastSeen = Date.now();

//     return updated;
//   });
// });

//     setClient(mqttClient);

//     return () => mqttClient.end(true);
//   }, []);

//   // 🔥 DYNAMIC SUBSCRIBE FUNCTION
//   const subscribeDevices = (devices = []) => {
//     if (!client || !client.connected) return;

//     devices.forEach((d) => {
//       const id = d.device_id;

//       client.subscribe([
//         MQTT_TOPICS.ALIVE(id),
//         MQTT_TOPICS.BATTERY(id),
//         MQTT_TOPICS.ALERT(id),
//         MQTT_TOPICS.ONLINE(id),
//       ]);
//     });
//   };

//   const publishMessage = (topic, message) => {
//     if (!client || !client.connected) return;
//     client.publish(topic, String(message));
//   };

//   return (
//     <MqttContext.Provider
//       value={{
//         client,
//         isConnected,
//         deviceStatus,
//         subscribeDevices,
//         publishMessage,
//       }}
//     >
//       {children}
//     </MqttContext.Provider>
//   );
// };

// export const useMqtt = () => useContext(MqttContext);


import React, { createContext, useEffect, useState, useContext } from "react";
import mqtt from "mqtt";
import { MQTT_TOPICS } from "../mqtt/mqttTopics";

export const MqttContext = createContext(null);

export const MqttProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState({});

  useEffect(() => {
    const mqttClient = mqtt.connect({
      hostname: "mqttbroker.bc-pl.com",
      port: 443,
      protocol: "wss",
      path: "/mqtt",
      username: "mqttuser",
      password: "Bfl@2025",
      reconnectPeriod: 3000,
      keepalive: 60,
    });

    mqttClient.on("connect", () => {
      setIsConnected(true);
      console.log("✅ MQTT connected");
    });

    mqttClient.on("close", () => {
      setIsConnected(false);
    });

    mqttClient.on("error", (err) => {
      console.error("❌ MQTT error:", err);
    });

    mqttClient.on("message", (topic, payload) => {
      const message = payload.toString();
      console.log("MQTT RECEIVED:", topic, message);

      // =========================
      // 🔥 AUTO FEEDER
      // =========================
      if (topic.startsWith("auto_feeder")) {
        const parts = topic.split("/");
        const deviceId = parts[1];

        setDeviceStatus((prev) => {
          const updated = { ...prev };
          updated[deviceId] = updated[deviceId] || {};

          if (topic.includes("battery")) {
            updated[deviceId].battery = Number(message);
          }

          if (topic.includes("alive")) {
            updated[deviceId].online =
              message.toLowerCase() === "alive" ||
              message === "1" ||
              message === "true";
          }

          if (topic.includes("alert")) {
            updated[deviceId].alert =
              message.toLowerCase() === "normal" ? null : message;
          }

          return updated;
        });
      }

      // =========================
      // 🔥 POWER MONITOR (BMS)
      // =========================
      if (topic.startsWith("bms")) {
        const parts = topic.split("/");
        const deviceId = parts[1];

        setDeviceStatus((prev) => {
          const updated = { ...prev };
          updated[deviceId] = updated[deviceId] || {};

          if (topic.includes("battery_state")) {
            updated[deviceId].battery = Number(message);
          }

          if (topic.includes("online")) {
            const val = message.trim().toLowerCase();

            updated[deviceId].online =
              val === "1" ||
              val === "true" ||
              val === "online" ||
              val === "alive";
          }

          return updated;
        });
      }

      // =========================
      // 🔥 POWER MONITOR (POMON HEARTBEAT) ✅ NEW
      // =========================
      if (topic.startsWith("pomon")) {
        const parts = topic.split("/");
        const deviceId = parts[1];

        setDeviceStatus((prev) => {
          const updated = { ...prev };
          updated[deviceId] = updated[deviceId] || {};

          if (topic.includes("heartbeat")) {
            const val = message.trim().toLowerCase();

            updated[deviceId].online =
              val === "alive" ||
              val === "1" ||
              val === "true";
          }

          return updated;
        });
      }
    });

    setClient(mqttClient);

    return () => mqttClient.end(true);
  }, []);

  // =========================
  // 🔥 SUBSCRIBE FUNCTION
  // =========================
  const subscribeDevices = (devices = []) => {
    if (!client || !client.connected) return;

    devices.forEach((d) => {
      const id = d.device_id;

      client.subscribe([
        // 🔥 AUTO FEEDER
        `auto_feeder/${id}/system/alive`,
        `auto_feeder/${id}/system/battery`,
        `auto_feeder/${id}/system/alert`,

        // 🔥 BMS
        `bms/${id}/battery_state`,
        `bms/${id}/online`,

        // 🔥 POMON HEARTBEAT ✅ NEW
        `pomon/${id}/heartbeat`,
      ]);
    });
  };

  const publishMessage = (topic, message) => {
    if (!client || !client.connected) return;
    client.publish(topic, String(message));
  };

  return (
    <MqttContext.Provider
      value={{
        client,
        isConnected,
        deviceStatus,
        subscribeDevices,
        publishMessage,
      }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => useContext(MqttContext);