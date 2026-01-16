import { createContext, useContext, useEffect, useRef, useState } from "react";
import { createMqttClient } from "../mqtt/mqttClient";
import { MQTT_TOPICS } from "../mqtt/mqttTopics";

const MqttContext = createContext(null);

export const MqttProvider = ({ children }) => {
  const DEVICE_ID = "BFL_FdtryA001";

  // Keep client stable across renders
  const clientRef = useRef(null);

  /* -------------------- CONNECTION -------------------- */
  const [connected, setConnected] = useState(false);

  /* -------------------- DEVICE STATE ------------------ */
  const [online, setOnline] = useState(false);
  const [mode, setMode] = useState("none");
  const [feedingStatus, setFeedingStatus] = useState("Paused");
  const [feedingWindow, setFeedingWindow] = useState(null);
  const [lastAutoStatus, setLastAutoStatus] = useState("");
  const [alert, setAlert] = useState(null);
  const [acPower, setAcPower] = useState("ON");
  const [rawMessages, setRawMessages] = useState([]);

  /* -------------------- MQTT SETUP -------------------- */
  useEffect(() => {
    const client = createMqttClient();
    clientRef.current = client;

    client.on("connect", () => {
      setConnected(true);
      console.log("MQTT connected");
      // 🔹 Force AUTO mode on dashboard load
      client.publish(MQTT_TOPICS.MODE_SWITCH(DEVICE_ID), "AUTO", { qos: 1 });

      // 🔹 Subscribe to required topics
      client.subscribe(
        [
          MQTT_TOPICS.ALIVE(DEVICE_ID),
          MQTT_TOPICS.MODE_STATUS(DEVICE_ID),
          MQTT_TOPICS.AUTO_STATUS(DEVICE_ID),
          MQTT_TOPICS.ALERT(DEVICE_ID),
          MQTT_TOPICS.AC_POWER(DEVICE_ID),
        ],
        { qos: 1 }
      );
    });

    client.on("reconnect", () => {
      setConnected(false);
      console.log("MQTT reconnecting...");
    });

    client.on("close", () => {
      setConnected(false);
      console.log("MQTT disconnected");
    });

    client.on("message", (topic, message) => {
      const payload = message.toString().trim();

      // 🔍 store raw messages (last 50)
      setRawMessages((prev) =>
        [{ topic, payload, ts: Date.now() }, ...prev].slice(0, 50)
      );

      switch (topic) {
        case MQTT_TOPICS.ALIVE(DEVICE_ID):
          setOnline(payload === "alive");
          break;

        case MQTT_TOPICS.MODE_STATUS(DEVICE_ID):
          setMode(payload);
          break;

        case MQTT_TOPICS.AUTO_STATUS(DEVICE_ID):
          handleAutoStatus(payload);
          break;

        case MQTT_TOPICS.ALERT(DEVICE_ID):
          // Alert auto-clears when payload is blank
          setAlert(payload === "" ? null : payload);
          break;

        case MQTT_TOPICS.AC_POWER(DEVICE_ID):
          setAcPower(payload);
          break;

        default:
          break;
      }
    });

    return () => {
      client.end(true);
    };
  }, []);

  /* -------------------- HELPERS -------------------- */
  const handleAutoStatus = (msg) => {
    setLastAutoStatus(msg);

    if (msg.includes("Feeding started")) {
      setFeedingStatus("Active");
    }

    if (msg.includes("Feeding completed")) {
      setFeedingStatus("Paused");
      setFeedingWindow(null);
    }

    if (msg.includes("Start at")) {
      const match = msg.match(/Start at (.*?),.*ends at (.*?)\)/);
      if (match) {
        setFeedingWindow(`${match[1]} - ${match[2]}`);
      }
    }
  };

  /* -------------------- NORMALIZED STATE -------------------- */
  const deviceState = {
    online,
    mode,
    feedingStatus,
    feedingWindow,
    lastAutoStatus,
    alert,
    acPower,
  };

  /* -------------------- CONTEXT VALUE -------------------- */
  return (
    <MqttContext.Provider
      value={{
        connected,
        deviceId: DEVICE_ID,
        client: clientRef.current,
        deviceState,
        rawMessages, 
      }}
    >
      {children}
    </MqttContext.Provider>
  );
};

/* -------------------- HOOK -------------------- */
export const useMqtt = () => {
  const context = useContext(MqttContext);
  if (!context) {
    throw new Error("useMqtt must be used inside MqttProvider");
  }
  return context;
};
