export const feedingDeviceConfig = {
  columns: [
    { key: "cycle", label: "Cycle No", readOnly: true },
    { key: "start", label: "Start Time", type: "time" },
    { key: "end", label: "End Time", type: "time" },
    { key: "feed", label: "Feed Weight %", type: "number" },
    { key: "worker", label: "Worker Assign", type: "select" }
  ],

  submitLabel: "Submit",
  abortLabel: "Abort"
};
