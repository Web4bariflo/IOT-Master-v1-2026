import mqtt from "mqtt";

const MQTT_CONFIG = {
      hostname: "mqttbroker.bc-pl.com",
      port: 443,
      protocol: "wss",
      path: "/mqtt",
      username: "mqttuser",
      password: "Bfl@2025",
      clientId: `mqtt_${Math.random().toString(16).slice(3)}`,
      reconnectPeriod: 5000
};

export const createMqttClient = () => {
  return mqtt.connect(
    `wss://${MQTT_CONFIG.hostname}:${MQTT_CONFIG.port}${MQTT_CONFIG.path}`,
    {
      username: MQTT_CONFIG.username,
      password: MQTT_CONFIG.password,
      clientId: "web_" + Math.random().toString(16).slice(2),
      clean: true,
      keepalive: 60,
      reconnectPeriod: 3000,
    }
  );
};
