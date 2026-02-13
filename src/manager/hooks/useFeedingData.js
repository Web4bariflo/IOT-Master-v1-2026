import { useState, useEffect } from "react";
import axios from "axios";

const BASEURL = process.env.REACT_APP_IP;

const useFeedingData = (pondId) => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [workers, setWorkers] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [rowStates, setRowStates] = useState({});
  const [cycleCount, setCycleCount] = useState("");
  const [feedAmount, setFeedAmount] = useState("");

  const mobno = localStorage.getItem("mobno") || "7744110055";

  /* ======================================================
     FETCH DEVICES + WORKERS
  ====================================================== */

  useEffect(() => {
    if (!pondId) return;

    const fetchBaseData = async () => {
      try {
        const devicesRes = await axios.get(
          `${BASEURL}/deviceid_view/${pondId}/`,
          { params: { device_type: "Feeding" } },
        );

        const list = Array.isArray(devicesRes.data)
          ? devicesRes.data
          : devicesRes.data?.devices || [];

        setDevices(list);

        if (list.length && !selectedDeviceId) {
          setSelectedDeviceId(list[0].device_id);
        }
      } catch (err) {
        console.error("Device fetch failed", err);
      }

      try {
        const res = await axios.get(`${BASEURL}/workerview/${mobno}/`);
        setWorkers((res.data?.Employee || []).map((e) => e.name));
      } catch {
        setWorkers([]);
      }
    };

    fetchBaseData();
  }, [pondId]);

  /* ======================================================
     FETCH EXISTING CYCLES FOR SELECTED DEVICE
  ====================================================== */
  useEffect(() => {
    if (!pondId || !selectedDeviceId) return;

    fetchDeviceTasks(selectedDeviceId);

    const interval = setInterval(() => {
      fetchDeviceTasks(selectedDeviceId);
    }, 60000); // every 5 seconds

    return () => clearInterval(interval);
  }, [pondId, selectedDeviceId]);

  const fetchDeviceTasks = async (deviceId) => {
    try {
      const res = await axios.get(`${BASEURL}/pond-task/`, {
        params: {
          pond_id: pondId,
          device_id: deviceId,
        },
      });
      // console.log("Fetched tasks for device", deviceId, res.data);
      const backendTasks = res.data?.tasks || [];

      // ✅ map backend tasks → frontend task shape
      const mappedTasks = backendTasks.map((task) => ({
        taskId: task.id,
        cycleNo: task.cycles,
        startTime: task.from_time || "",
        endTime: task.to_time || "",
        feedWeight: task.feed_weight || "",
        worker: task.worker_name || "",
        status: task.status || "pending",
      }));

      setTasks(mappedTasks);
    } catch (err) {
      console.error("Fetch pond-task failed", err);
      setTasks([]); // fail-safe
    }
  };

  /* ======================================================
     GENERATE CYCLES
  ====================================================== */

  const handleGenerate = async () => {
    if (!selectedDeviceId || cycleCount < 1) return;

    try {
      await axios.post(`${BASEURL}/generate/`, {
        deviceName: "Feeding",
        deviceId: selectedDeviceId,
        cycles: cycleCount,
        feedin: feedAmount,
      });

      // ✅ DO NOT touch table state
      // Just refetch from backend
      fetchDeviceTasks(selectedDeviceId);
    } catch (err) {
      console.error("Error generating cycles:", err);
    }
  };

  /* ======================================================
     ROW CHANGE (LOCAL ONLY)
  ====================================================== */

  const updateTask = (taskId, field, value) => {
    setTasks((prev) =>
      prev.map((t) => (t.taskId === taskId ? { ...t, [field]: value } : t)),
    );
  };

  /* ======================================================
     SUBMIT (START)
  ====================================================== */

  const handleSubmit = async (row) => {
    if (!row.taskId) return;
    try {
      await axios.put(`${BASEURL}/tasksubmit/${row.taskId}/`, {
        from_time: row.startTime,
        to_time: row.endTime,
        feed_weight: row.feedWeight,
        worker_name: row.worker,
      });
      // console.log("Submitting cycle:", row);

      await axios.post(`${BASEURL}/automode/${selectedDeviceId}/${row.taskId}/`);
      // console.log("Sent MQTT start command for task:", row.taskId);

      // ✅ refetch real data
      fetchDeviceTasks(selectedDeviceId);
    } catch (err) {
      console.error("Submit failed", err);
    }
  };

  const handleAbort = async () => {
    try {
      await axios.post(`${BASEURL}/automodeabort/${selectedDeviceId}/`);
      alert("Device task has been aborted successfully!");

      fetchDeviceTasks(selectedDeviceId);
    } catch (err) {
      console.error("Abort failed", err);
    }
  };
  

  const handleRestart = (row) => {
    console.log("Restarting cycle:", row.taskId);

    // updateTask(row.taskId, "status", "pending");
  };
  return {
    devices,
    selectedDeviceId,
    setSelectedDeviceId,
    workers,
    cycleCount,
    setCycleCount,
    feedAmount,
    setFeedAmount,
    tasks,
    updateTask,
    handleGenerate,
    handleSubmit,
    rowStates,
    setRowStates,
    handleAbort,
    handleRestart,
  };
};

export default useFeedingData;
