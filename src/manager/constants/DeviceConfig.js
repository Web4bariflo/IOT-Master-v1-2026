export const DEVICE_CONFIG = {
  FEEDER: {
    deviceType: "Feeding",
    title: "Auto Feeders",
    topic: "auto_feeder",
    hasBattery: true,
    hasSignal: true,
  },
  FARM: {
    deviceType: "checktray",
    title: "Check Trays",
    topic: "checktray",
    hasBattery: true,
    hasSignal: true,
  },
  POWER: {
  deviceType: "Power Monitoring",
  title: "Power Monitoring",
  topic: "pomon",
  hasBattery: true, // ✅ IMPORTANT
  hasSignal: true,
},
};