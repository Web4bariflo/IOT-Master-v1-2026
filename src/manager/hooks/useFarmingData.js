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
      setTasks(res.data.task);
    } catch (error) {
      console.log("getting all task error", error);
    }
  };


  useEffect(() => {
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

    if (!formattedTime) {
      alert("Please select a start time before submitting.");
      return;
    }

    if (!selectedWorker) {
      alert("Please select a worker before submitting.");
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

    console.log("Submitting schedule payload", payload);

    try {
      const res = await axios.post(`${BASEURL}/schedule/`, payload);
      if (res.status === 200) {
        setIsSubmitted(true);
        alert("Schedule submitted successfully");
      } else {
        console.error("Schedule submit returned non-200", res.status, res.data);
        alert(`Schedule submission failed: ${res.status} ${JSON.stringify(res.data)}`);
      }
    } catch (error) {
      const responseData = error?.response?.data;
      const status = error?.response?.status;
      console.error("Error submitting schedule", status, responseData || error.message || error);
      const message = responseData?.detail || responseData?.message || responseData || error.message || "Unknown error";
      alert(`Schedule submission failed: ${status || "?"} ${JSON.stringify(message)}`);
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