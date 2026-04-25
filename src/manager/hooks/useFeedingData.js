
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

    // initial fetch
    fetchDeviceTasks(selectedDeviceId);

    // 🔥 start polling
    const interval = setInterval(() => {
      fetchDeviceTasks(selectedDeviceId);
    }, 5000); // 5 sec

    // cleanup
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
      const mappedTasks = backendTasks.map((task) => {
        const formatTimeForInput = (timeStr) => {
          if (!timeStr) return "";
          // Extract HH:MM safely whether there are seconds/microseconds or not
          const match = String(timeStr).match(/^(\d{2}:\d{2})/);
          if (match) return match[1];

          const date = new Date(timeStr);
          if (!isNaN(date.getTime())) {
            const hh = String(date.getHours()).padStart(2, "0");
            const mm = String(date.getMinutes()).padStart(2, "0");
            return `${hh}:${mm}`;
          }
          return timeStr;
        };

        return {
          taskId: task.id,
          cycleNo: task.cycles,
          startTime: formatTimeForInput(task.from_time),
          endTime: formatTimeForInput(task.to_time || task.end_time || task.stop_time),
          feedin: task.feedin || "",
          feedWeight: task.feed_weight !== null && task.feed_weight !== undefined ? task.feed_weight : "",
          worker: task.worker_name || task.worker || "",
          // status: task.status || "pending",
          status: task.status || "",
        };
      });

      setTasks((prevTasks) => {
        return mappedTasks.map((newTask) => {
          const existing = prevTasks.find(t => t.taskId === newTask.taskId);

          if (!existing) return newTask;

          return {
            ...newTask,

            // ✅ Preserve user inputs if already typed
            startTime: existing.startTime || newTask.startTime,
            feedWeight: existing.feedWeight || newTask.feedWeight,
            worker: existing.worker || newTask.worker,

            // ✅ Preserve preview-calculated values
            endTime: existing.endTime || newTask.endTime,
            timeInterval: existing.timeInterval || newTask.timeInterval,
          };
        });
      });
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
        schedule_date: new Date().toISOString().split("T")[0], // ✅ required

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

  const updateTask = async (taskId, field, value) => {
    setTasks((prev) => {
      const updated = prev.map((t) =>
        t.taskId === taskId ? { ...t, [field]: value } : t
      );

      const newRow = updated.find((t) => t.taskId === taskId);

      // ✅ call preview only when needed
      if (field === "startTime" || field === "feedWeight") {
        const rawWeight = newRow.feedWeight;

        if (!newRow.startTime || !rawWeight || !feedAmount) {
          return updated;
        }

        // 🔥 call API (async inside setState NOT allowed directly)
        handlePreview(taskId, newRow.startTime, rawWeight);
      }

      return updated;
    });
  };

  const handlePreview = async (taskId, startTime, rawWeight) => {
    try {
      const res = await axios.post(`${BASEURL}/feedtimepreview/`, {
        from_time: startTime,
        feed_weight: String(rawWeight),
        total_feed: String(feedAmount),
      });

      if (res.data) {
        const { end_time, duration } = res.data;

        setTasks((prev) =>
          prev.map((t) =>
            t.taskId === taskId
              ? {
                ...t,
                endTime: end_time,
                timeInterval: duration, // ✅ ADD THIS
              }
              : t
          )
        );
      }
    } catch (err) {
      console.error("Preview API failed:", err);
    }
  };
  const getEndTimePreview = async (row) => {
    try {
      if (!row.startTime) return;

      const rawWeight =
        row.feedWeight !== "" && row.feedWeight !== null
          ? row.feedWeight
          : row.feedin;

      if (!rawWeight) return;

      const res = await axios.post(`${BASEURL}/feedtimepreview/`, {
        from_time: row.startTime,
        feed_weight: String(rawWeight),
        total_feed: String(feedAmount), // total feed from top input
      });

      console.log("Preview Response:", res.data);

      return res.data; // { duration, end_time }
    } catch (err) {
      console.error("Preview API failed:", err);
      return null;
    }
  };
  const handleSubmitAll = async () => {
    if (!tasks.length) {
      alert("No tasks to submit");
      return;
    }

    try {
      const cycles = {};

      tasks.forEach((row, index) => {
        const validWorker = workers.includes(row.worker) ? row.worker : "";

        if (!validWorker) {
          throw new Error(`Worker missing in cycle ${index + 1}`);
        }

        const rawWeight =
          row.feedWeight !== "" && row.feedWeight !== null
            ? row.feedWeight
            : row.feedin;

        cycles[String(index + 1)] = {
          from_time: row.startTime,
          feed_weight: rawWeight ? Number(rawWeight) : 0,
          worker_name: validWorker,

          // ✅ from preview API
          to_time: row.endTime || null,
          time_interval: row.timeInterval || null,
        };
      });

      const payload = {
        device_id: selectedDeviceId,
        cycles: cycles,
      };

      console.log("Final Payload:", payload);

      const res = await axios.put(`${BASEURL}/tasksubmit/`, payload);

      console.log("Submit All Success:", res.data);

      alert("All cycles submitted successfully");

      // Refresh table
      fetchDeviceTasks(selectedDeviceId);

    } catch (err) {
      console.error("Submit All failed:", err);
      alert(err.message || "Submit All failed");
    }
  };

  const handleAbort = async (row) => {
    if (!row || !row.taskId) return;
    try {
      const now = new Date();
      const hh = String(now.getHours()).padStart(2, "0");
      const mm = String(now.getMinutes()).padStart(2, "0");
      const formattedTime = `${hh}:${mm}`;

      const validWorker = workers.includes(row.worker) ? row.worker : "";

      try {
        await axios.put(`${BASEURL}/tasksubmit/${row.taskId}/`, {
          from_time: row.startTime,
          to_time: formattedTime,
          feed_weight: row.feedWeight,
          worker_name: validWorker,
        });
      } catch (err) {
        console.warn("Could not save to_time during abort:", err);
      }

      // Optimistic UI updates so it appears instantly before the IoT callback runs
      updateTask(row.taskId, "endTime", formattedTime);
      updateTask(row.taskId, "status", "Abort");

      const res = await axios.post(`${BASEURL}/automodeabort/${selectedDeviceId}/${row.taskId}/`);
      if (res.data?.status === "success") {
        alert(res.data.message || "Process Aborted");
      } else {
        alert("Device task has been aborted successfully!");
      }

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
    // handleSubmit,
    handleSubmitAll,
    rowStates,
    setRowStates,
    handleAbort,
    handleRestart,
  };
};

export default useFeedingData;

