import { useEffect, useState } from "react";
import axios from "axios";

const BASEURL = process.env.REACT_APP_IP;

export const useFarmingData = (pondId) => {
  const [devices, setDevices] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState("");
  const [tasks, setTasks] = useState([])
  const [startTimes, setStartTimes] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [workers, setWorkers] = useState([]);

  const mobno = localStorage.getItem("mobno") || "7744110055";

  useEffect(() => {
    const fetchDeviceIds = async () => {
      if (!pondId) return;

      try {
        const res = await axios.get(
          `${BASEURL}/deviceid_view/${pondId}/`,
          { params: { device_type: "checktray" } }
        );

        setDevices(res.data?.devices || res.data || []);
      } catch {
        setDevices([]);
      }
    };

    const fetchWorkers = async () => {
      try {
        const res = await axios.get(`${BASEURL}/workerview/${mobno}/`);
        setWorkers((res.data?.Employee || []).map((e) => e.name));
      } catch {
        setWorkers([]);
      }
    };

    fetchDeviceIds();
    fetchWorkers();
  }, [pondId]);

  const checktrayGenerate = async () => {
    if (!selectedDevice) return;

    try {
      const res = await axios.post(`${BASEURL}/checktray_generate/`, {
        device_id: selectedDevice,
      });

      if (res.status === 200) {
        getAllTask()
        console.log("Success:", res.data);
      }
    } catch (error) {
      console.error("Checktray generate API error:", error);
    }
  };

  const getAllTask = async () => {
    try {
      const res = await axios.get(`${BASEURL}/checktray_task/`, {
        params: {
          device_id: selectedDevice
        }
      });

      const apiTasks = res.data.task || [];

      setTasks(
        apiTasks.map((task) => ({
          ...task,
          worker:
            task.worker ||
            localStorage.getItem(`worker_${task.id}`) ||
            "",
          start_time:
            task.start_time ||
            "",
        }))
      );

    } catch (error) {
      console.log("getting all task error", error);
    }
  };
  useEffect(() => {

    const interval = setInterval(() => {
      getAllTask(selectedDevice);
    }, 5000); // 5 sec

    // cleanup
    return () => clearInterval(interval)

    if (selectedDevice) {
      getAllTask();
    }
  }, [selectedDevice])




  useEffect(() => { getAllTask() }, [])

  const handleStartTimeChange = (taskId, value) => {
    setStartTimes((prev) => ({
      ...prev,
      [taskId]: value,
    }));
  };

  const handleSubmit = async (task, workerName) => {
    const formattedTime = startTimes[task.id]?.replace("T", " ");
    const selectedWorker = workerName || task.worker || "";

    if (!formattedTime || !selectedWorker) {
      alert("Fill all fields");
      return;
    }

    const payload = {
      id: task.id,
      task_id: task.id,
      device_id: task.device_id,
      from_time: formattedTime,
      start_time: formattedTime,
      worker_name: selectedWorker,
      to_time: task.stop_time || null,
    };

    try {
      const res = await axios.post(`${BASEURL}/schedule/`, payload);

      if (res.status === 200) {

        localStorage.setItem(`worker_${task.id}`, selectedWorker); // ✅ ADD THIS

        // ✅ IMPORTANT: update UI state
        setTasks((prev) =>
          prev.map((t) =>
            t.id === task.id
              ? {
                ...t,
                worker: selectedWorker,
                start_time: formattedTime,
                submit: "True",
              }
              : t
          )
        );

        // ✅ optional: clear local temp state
        setStartTimes((prev) => {
          const copy = { ...prev };
          delete copy[task.id];
          return copy;
        });

        alert("Schedule submitted successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${BASEURL}/delete_task/`, {
        data: { id: id }
      });

      if (res.status === 200) {
        getAllTask()
        console.log("successfully deleted id:", id);
      }

    } catch (error) {
      console.log(error);
    }
  };

  const updateTask = (taskId, field, value) => {
    // This function updates task state locally for UI purposes
    // Additional fields like 'worker' can be stored here and sent with handleSubmit
  };


  return {
    devices,
    selectedDevice,
    setSelectedDevice,
    checktrayGenerate,
    tasks,
    handleSubmit,
    handleStartTimeChange,
    startTimes,
    isSubmitted,
    setIsSubmitted,
    handleDelete,
    workers,
    updateTask,
  };
};

