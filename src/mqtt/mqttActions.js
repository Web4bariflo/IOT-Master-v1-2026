// mqttActions.js
import { MQTT_TOPICS } from "./mqttTopics";

export const scheduleFeeding = (
  client,
  feederId,
  payload
) => {
  if (!client || !client.connected) {
    console.error("❌ MQTT not connected");
    return;
  }

  console.log("📤 MQTT SCHEDULE", feederId, payload);

  client.publish(
    MQTT_TOPICS.SCHEDULE(feederId),
    JSON.stringify(payload),
    { qos: 1 }
  );
};

export const abortFeeding = (client, feederId) => {
  if (!client || !client.connected) {
    console.error("❌ MQTT not connected");
    return;
  }

  console.log("⛔ MQTT ABORT", feederId);

  client.publish(
    MQTT_TOPICS.ABORT(feederId),
    "abort",
    { qos: 1 }
  );
};
