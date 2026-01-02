import api from "@/config/axios.config";

export const FeedingService = {
  getDevices: (pondId) =>
    api.get(`/deviceid_view/${pondId}/`, {
      params: { device_type: "Feeding" },
    }),

  getWorkers: (mobno) =>
    api.get(`/workerview/${mobno}/`),

  generateCycles: (payload) =>
    api.post("/cyclestatus/", payload),
};
