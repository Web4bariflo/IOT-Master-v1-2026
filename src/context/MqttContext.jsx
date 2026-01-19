import React, { createContext, useEffect, useState, useContext } from "react";
import mqtt from "mqtt";

export const MqttContext = createContext(null);

export const MqttProvider = ({ children }) => {
  const [client, setClient] = useState(null);
  const [isConnected, setIsConnected] = useState(false);



  // -----------------------------
  // MQTT CONNECT
  // -----------------------------
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
      console.log("✅ MQTT connected");
      setIsConnected(true);
    });

    mqttClient.on("reconnect", () => {
      console.warn("🔁 MQTT reconnecting...");
    });

    mqttClient.on("close", () => {
      console.warn("⚠️ MQTT disconnected");
      setIsConnected(false);
    });

    mqttClient.on("error", (err) => {
      console.error("❌ MQTT error:", err);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end(true);
    };
  }, []);

  // -----------------------------
  // PUBLISH
  // -----------------------------
  const publishMessage = (topic, message) => {
    if (!client || !client.connected) {
      console.warn("❌ MQTT not connected, publish skipped");
      return;
    }

    client.publish(topic, String(message));
    console.log(`🚀 Published → ${topic}`, message);
  };



  return (
    <MqttContext.Provider
      value={{
        client,
        isConnected,
        publishMessage,
      }}
    >
      {children}
    </MqttContext.Provider>
  );
};

export const useMqtt = () => {
  const ctx = useContext(MqttContext);
  if (!ctx) {
    throw new Error("useMqtt must be used inside MqttProvider");
  }
  return ctx;
};
