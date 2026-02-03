import { useState, useEffect } from "react";
import axios from "axios";

const BASEURL = process.env.REACT_APP_IP;

const useFeedingData = (pondId) => {
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [workers, setWorkers] = useState([]);
  const [feedAmount, setFeedAmount] = useState(0);
  const [cycleCount, setCycleCount] = useState("");
  const [deviceCycles, setDeviceCycles] = useState({});
  const [rowStates, setRowStates] = useState({});

  const mobno = localStorage.getItem("mobno") || "7744110055"; // default for testing

  /* ================= FETCH ================= */
  useEffect(() => {
    const fetchData = async () => {
      if (!pondId) return;

      try {
        const devicesRes = await axios.get(
          `${BASEURL}/deviceid_view/${pondId}/`,
          { params: { device_type: "Feeding" } },
        );
        console.log("Device API OK:", devicesRes.data);

        setDevices(
          Array.isArray(devicesRes.data)
            ? devicesRes.data
            : devicesRes.data?.devices || [],
        );
      } catch (err) {
        console.error(
          " Device API failed:",
          err.response?.status,
          err.config?.url,
        );
      }

      try {
        console.log("Calling WORKER API...");
        const res = await axios.get(`${BASEURL}/workerview/${mobno}/`);
        const employeeList = res.data?.Employee || [];
        setWorkers(employeeList.map((emp) => emp.name));
      } catch (err) {
        console.error(
          " Worker API failed:",
          err.response?.status,
          err.config?.url,
        );
        setWorkers([]);
      }
    };

    fetchData();
  }, [pondId, mobno]);

  const isLocked = Object.keys(deviceCycles).length === devices.length;

  /* ================= GENERATE ================= */
  const handleGenerate = async () => {
    if (!selectedDeviceId || cycleCount < 1) return;

    // ✅ CREATE PLACEHOLDER TASK IDS
    const task_ids = Array.from(
      { length: Number(cycleCount) },
      (_, i) => `pending-${Date.now()}-${i + 1}`,
    );

    // 🔁 Call backend (fire & forget)
    try {
      const res = await axios.post(`${BASEURL}/generate/`, {
        deviceName: "Feeding",
        deviceId: selectedDeviceId,
        cycles: cycleCount,
        feedin: feedAmount,
      });

      console.log("Generate response:", res.data);
    } catch (err) {
      console.error("Generate failed", err);
    }

    // ✅ DEVICE META
    setDeviceCycles((prev) => ({
      ...prev,
      [selectedDeviceId]: {
        cycles: cycleCount,
        feedAmount,
      },
    }));

    // ✅ CREATE UI ROWS IMMEDIATELY
    const rows = {};
    task_ids.forEach((taskId, i) => {
      rows[`${selectedDeviceId}-C${i + 1}`] = {
        taskId,
        cycleNo: i + 1,
        startTime: "",
        endTime: "",
        feedWeight: "",
        worker: "",
        status: i === 0 ? "active" : "locked",
      };
    });

    setRowStates((prev) => ({
      ...prev,
      ...rows,
    }));
  };

  /* ================= ROW CHANGE ================= */
  const handleRowChange = (rowKey, field, value) => {
    setRowStates((p) => ({
      ...p,
      [rowKey]: { ...p[rowKey], [field]: value },
    }));
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (rowKey) => {
    const row = rowStates[rowKey];
    if (!row) return;

    // ✅ REST (ACTIVE)
    await axios.put(`${BASEURL}/tasksubmit/${row.taskId}/`, {
      from_time: row.startTime,
      to_time: row.endTime,
      feed_weight: row.feedWeight,
      worker_name: row.worker,
    });

    /*
  // 🚧 MQTT (FOR LATER)
  publishMQTT("feeding/command", {
    action: "submit",
    taskId: row.taskId,
    deviceId: selectedDeviceId,
    cycle: row.cycleNo,
  });
  */

    setRowStates((p) => ({
      ...p,
      [rowKey]: { ...p[rowKey], status: "processing" },
    }));
  };

  /* ================= ABORT ================= */
  const handleAbort = async (rowKey) => {
    const row = rowStates[rowKey];
    if (!row) return;

    await axios.post(`${BASEURL}/abort/${row.taskId}/`);

    setRowStates((p) => ({
      ...p,
      [rowKey]: { ...p[rowKey], status: "aborted" },
    }));
  };

  /* ================= RESTART ================= */
  const handleRestart = (rowKey) => {
    setRowStates((p) => ({
      ...p,
      [rowKey]: {
        ...p[rowKey],
        status: "active",
        startTime: "",
        endTime: "",
        feedWeight: "",
        worker: "",
      },
    }));
  };

  return {
    devices,
    workers,
    selectedDeviceId,
    setSelectedDeviceId,
    feedAmount,
    setFeedAmount,
    cycleCount,
    setCycleCount,
    deviceCycles,
    rowStates,
    isLocked,
    handleGenerate,
    handleRowChange,
    handleSubmit,
    handleAbort,
    handleRestart,
  };
};

export default useFeedingData;
