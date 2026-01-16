import { MQTT_TOPICS } from "../mqtt/mqttTopics";

export const scheduleFeeding = (
  client,
  deviceId,
  time,
  duration,
  feedRpm,
  sprinkleRpm
) => {
  if (!client) {
    console.error("❌ MQTT client not available");
    return;
  }

  const topic = MQTT_TOPICS.SCHEDULE(deviceId);
  const payload = `${time},${duration},${feedRpm},${sprinkleRpm}`;

  console.log("📤 Scheduling feed", { topic, payload });

  client.publish(topic, payload, { qos: 1 }, (err) => {
    if (err) {
      console.error("❌ Schedule publish failed", err);
    } else {
      console.log("✅ Schedule command delivered to broker");
    }
  });
};

export const abortFeeding = (client, deviceId) => {
  if (!client) {
    console.error("❌ MQTT client not available");
    return;
  }

  const topic = MQTT_TOPICS.ABORT(deviceId);

  console.log("🛑 Aborting feed", { topic });

  client.publish(topic, "abort", { qos: 1 }, (err) => {
    if (err) {
      console.error("❌ Abort publish failed", err);
    } else {
      console.log("✅ Abort command delivered to broker");
    }
  });
};
