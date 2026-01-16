export const MQTT_TOPICS = {
  MODE_SWITCH: (id) => `auto_feeder/${id}/mode/switch`,
  MODE_STATUS: (id) => `auto_feeder/${id}/mode/status`,

  SCHEDULE: (id) => `auto_feeder/${id}/schedule`,
  ABORT: (id) => `auto_feeder/${id}/auto/abort`,
  AUTO_STATUS: (id) => `auto_feeder/${id}/auto/status`,

  ALERT: (id) => `auto_feeder/${id}/system/alert`,
  ALIVE: (id) => `auto_feeder/${id}/system/alive`,
  AC_POWER: (id) => `bms/${id}/ac`,
};
