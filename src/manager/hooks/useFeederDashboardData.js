import { useEffect, useState } from "react";
import axios from "axios";

const BASEURL = process.env.REACT_APP_IP;

const useFeederDashboardData = (pondId) => {
  const [devices, setDevices] = useState([]);
  const [deviceTasksMap, setDeviceTasksMap] = useState({});
  const [loading, setLoading] = useState(false);

  /* ======================================================
     FETCH DEVICES
  ====================================================== */
  useEffect(() => {
    if (!pondId) return;

    const fetchDevices = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${BASEURL}/deviceid_view/${pondId}/`,
          { params: { device_type: "Feeding" } },
        );
        const list = Array.isArray(res.data)
          ? res.data
          : res.data?.devices || [];

        setDevices(list);
      } catch (err) {
        console.error("Dashboard device fetch failed", err);
        setDevices([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, [pondId]);

  /* ======================================================
     FETCH TASKS FOR EACH DEVICE
  ====================================================== */
  useEffect(() => {
    if (!pondId || !devices.length) return;

    const fetchAllDeviceTasks = async () => {
      const taskMap = {};

      await Promise.all(
        devices.map(async (device) => {
          try {
            const res = await axios.get(`${BASEURL}/pond-task/`, {
              params: {
                pond_id: pondId,
                device_id: device.device_id,
              },
            });

            const backendTasks = res.data?.tasks || [];

            taskMap[device.device_id] = backendTasks.map((task) => ({
              taskId: task.id,
              cycleNo: task.cycles,
              startTime: task.from_time || "",
              endTime: task.to_time || "",
              feedWeight: task.feed_weight || "",
              status: task.status || "pending",
            }));
          } catch (err) {
            console.error(
              `Dashboard task fetch failed for ${device.device_id}`,
              err,
            );
            taskMap[device.device_id] = [];
          }
        }),
      );

      setDeviceTasksMap(taskMap);
    };

    fetchAllDeviceTasks();
  }, [pondId, devices]);

  return {
    devices,
    deviceTasksMap,
    loading,
  };
};

export default useFeederDashboardData;
