export const MQTT_TOPICS = {
  MODE_SWITCH: (id) => `auto_feeder/${id}/mode/switch`,
  MODE_STATUS: (id) => `auto_feeder/${id}/mode/status`,

  SCHEDULE: (id) => `auto_feeder/${id}/schedule`,
  ABORT: (id) => `auto_feeder/${id}/auto/abort`,
  AUTO_STATUS: (id) => `auto_feeder/${id}/auto/status`,

  ALERT: (id) => `auto_feeder/${id}/system/alert`,
  ALIVE: (id) => `auto_feeder/${id}/system/alive`,
  BATTERY: (id) => `auto_feeder/${id}/system/battery`,

  AC_POWER: (id) => `bms/${id}/ac`,
  BATTERYSTATE: (id) => `bms/${id}/battery_state`,
  ONLINE: (id) => `bms/${id}/online`,
  EVENT: (id) => `bms/${id}/event`,
};
