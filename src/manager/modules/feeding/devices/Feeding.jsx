import { useState, useEffect } from "react";
import axios from "axios";
import DeviceCard from "../../../components/DeviceCard";
import feeding from "../../../../assets/Images/FeedersActive.png";
import ActionButton from "../../../components/ActionButton";
const BASEURL = process.env.REACT_APP_IP;

const Feeding = ({ pondId }) => {
  const [devices, setDevices] = useState([]); // array from API
  const [selectedDeviceId, setSelectedDeviceId] = useState("");
  const [workers, setWorkers] = useState([]);
  const [feedAmount, setFeedAmount] = useState(0);
  const [cycleCount, setCycleCount] = useState("");
  const [deviceCycles, setDeviceCycles] = useState({});
  const [rowStates, setRowStates] = useState({});
  const [loading, setLoading] = useState(false);
  const mobno = localStorage.getItem("mobno");

  useEffect(() => {
    const fetchDeviceIds = async () => {
      try {
        const response = await axios.get(
          `${BASEURL}/deviceid_view/${pondId}/`,
          { params: { device_type: "Feeding" } }
        );

        setDevices(response.data.devices || []);
      } catch (error) {
        console.error("Error fetching device Ids", error);
      }
    };

    const fetchWorkers = async () => {
      try {
        const response = await axios.get(`${BASEURL}/workerview/${mobno}/`);
        setWorkers(
          response.data.Employee || ["Worker A", "Worker B", "Worker C"]
        );
      } catch (error) {
        console.error("Error fetching device Ids", error);
      }
    };

    fetchDeviceIds();
    fetchWorkers();
  }, [pondId]);

  const isLocked = Object.keys(deviceCycles).length === devices.length;

  /* ================= Utility ================= */
  const getDurationMs = (start, end) => {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    return (eh * 60 + em - (sh * 60 + sm)) * 60 * 1000;
  };

  /* ================= Generate ================= */
  const handleGenerate = async () => {
    if (!selectedDeviceId || cycleCount < 1) return;

    try {
      // 1️⃣ FIRST call API
      const response = await axios.post(`${BASEURL}/generate/`, {
        deviceName: "Feeding",
        deviceId: selectedDeviceId,
        cycles: cycleCount,
        feedin: feedAmount,
      });

      console.log("Cycle status response:", response.data);

      const { task_ids } = response.data;

      // 2️⃣ THEN generate cycles in UI
      setDeviceCycles({
        [selectedDeviceId]: cycleCount,
      });

      // 2️⃣ Initialize rowStates WITH task_ids
      const newRows = {};

      task_ids.forEach((taskId, index) => {
        const rowKey = `${selectedDeviceId}-C${index + 1}`;

        newRows[rowKey] = {
          taskId,
          cycleNo: index + 1, // ✅ important
          startTime: "",
          endTime: "",
          feedWeight: "",
          worker: "",
          status: index === 0 ? "active" : "locked", // 👈 KEY
          timerId: null,
        };
      });

      setRowStates((prev) => ({
        ...prev,
        ...newRows,
      }));
    } catch (error) {
      console.error(
        "Cycle status error:",
        error.response?.data || error.message
      );
    }
  };

  /* ================= Row State Handler ================= */
  const handleRowChange = (rowKey, field, value) => {
    setRowStates((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        [field]: value,
      },
    }));
  };

  /* ================= Submit ================= */
  const handleSubmit = (rowKey) => {
    console.log("Submitting row:", rowKey);
    const row = rowStates[rowKey];

    if (!row?.startTime || !row?.endTime || !row?.feedWeight || !row?.worker)
      // console.log("Incomplete data for row:", rowKey);
      return;

    const duration = getDurationMs(row.startTime, row.endTime);
    if (duration <= 0) return;

    // 🔑 This is the task id from generate API
    const taskId = row.taskId;

    console.log("Submitting task:", taskId);

    // 👉 Later this will be API call
    axios.put(`${BASEURL}/tasksubmit/${taskId}/`, {
      task_id: taskId,
      from_time: row.startTime,
      to_time: row.endTime,
      feed_weight: row.feedWeight,
      worker_name: row.worker,
    });

    const timerId = setTimeout(() => {
      setRowStates((prev) => {
        const updated = {
          ...prev,
          [rowKey]: {
            ...prev[rowKey],
            status: "completed",
            timerId: null,
          },
        };

        // 🔓 Unlock next cycle
        const nextCycleKey = `${selectedDeviceId}-C${row.cycleNo + 1}`;

        if (updated[nextCycleKey]) {
          updated[nextCycleKey] = {
            ...updated[nextCycleKey],
            status: "active",
          };
        }

        return updated;
      });
    }, duration);

    setRowStates((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        status: "processing",
        timerId,
      },
    }));

    console.log(rowKey, rowStates[rowKey]?.taskId);
  };

  /* ================= Abort ================= */
  const handleAbort = async (rowKey) => {
    const row = rowStates[rowKey];
    if (!row?.taskId) return;

    // 1️⃣ Clear timer
    if (row.timerId) {
      clearTimeout(row.timerId);
    }

    try {
      // 2️⃣ Call abort API
      await axios.post(`${BASEURL}/abort/${row.taskId}/`, {
        status: "processing",
      });

      // 3️⃣ Update UI
      setRowStates((prev) => ({
        ...prev,
        [rowKey]: {
          ...prev[rowKey],
          status: "aborted",
          timerId: null,
        },
      }));
    } catch (error) {
      console.error("Abort failed", error);
      alert("Failed to abort task");
    }
  };

  /* ================= Restart ================= */
  const handleRestart = (rowKey) => {
    setRowStates((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        status: "active",
        startTime: "",
        endTime: "",
        feedWeight: "",
        worker: "",
        timerId: null,
      },
    }));
  };

  return (
    <div>
      {/* ================= TOP CONTROLS ================= */}
      <div className="flex items-center gap-6 text-sm p-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Device Id :</label>
          <select
            disabled={isLocked}
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">{loading ? "Loading..." : "Select"}</option>

            {devices.map((device) => (
              <option key={device.device_id} value={device.device_id}>
                {device.device_id}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">Feeding cycles :</label>
          <input
            type="number"
            min={1}
            disabled={isLocked}
            value={cycleCount}
            onChange={(e) => setCycleCount(Number(e.target.value))}
            className="w-16 border rounded px-2 py-1"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Feed Amount (Kg):</label>
          <input
            type="text"
            disabled={isLocked}
            value={feedAmount}
            onChange={(e) => setFeedAmount(Number(e.target.value))}
            className="w-16 border rounded px-2 py-1"
            placeholder="Kg"
          />
        </div>

        {!isLocked && (
          <button
            onClick={handleGenerate}
            className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
          >
            Generate
          </button>
        )}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex gap-6 px-4">
        <DeviceCard title="Feeding" icon={feeding} />

        <div className="flex-1 border rounded-lg p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-left pb-2">
                <th className="pb-2">Device</th>
                <th className="pb-2">Cycle</th>
                <th className="pb-2">Start</th>
                <th className="pb-2">End</th>
                <th className="pb-2">Feed %</th>
                <th className="pb-2">Worker</th>
                <th className="pb-2"></th>
                <th className="pb-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(deviceCycles).length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    Select device and cycle, then click Generate
                  </td>
                </tr>
              )}
              {Object.entries(deviceCycles).map(([devId, count]) =>
                Array.from({ length: count }, (_, i) => {
                  const rowKey = `${devId}-C${i + 1}`;
                  const row = rowStates[rowKey] || { status: "idle" };
                  const disabled = row.status !== "active";

                  return (
                    <tr key={rowKey} className="hover:bg-gray-50">
                      <td className="pb-2">{devId}</td>
                      <td className="pb-2">C{i + 1}</td>

                      <td className="pb-2">
                        <input
                          type="time"
                          disabled={disabled}
                          value={row.startTime || ""}
                          onChange={(e) =>
                            handleRowChange(rowKey, "startTime", e.target.value)
                          }
                          className="border rounded px-2 py-1"
                        />
                      </td>

                      <td className="pb-2">
                        <input
                          type="time"
                          disabled={disabled}
                          value={row.endTime || ""}
                          onChange={(e) =>
                            handleRowChange(rowKey, "endTime", e.target.value)
                          }
                          className="border rounded px-2 py-1"
                        />
                      </td>

                      <td className="pb-2">
                        <input
                          min={1}
                          max={100}
                          disabled={disabled}
                          value={row.feedWeight || ""}
                          onChange={(e) =>
                            handleRowChange(
                              rowKey,
                              "feedWeight",
                              e.target.value
                            )
                          }
                          className="w-20 border rounded px-2 py-1"
                        />
                      </td>

                      <td className="pb-2">
                        <select
                          disabled={disabled}
                          value={row.worker || ""}
                          onChange={(e) =>
                            handleRowChange(rowKey, "worker", e.target.value)
                          }
                          className="border rounded px-2 py-1"
                        >
                          <option value="">Select</option>
                          {workers.map((worker) => (
                            <option key={worker.id} value={worker.name}>
                              {worker.name}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td className="pb-2">
                        <ActionButton
                          status={row.status}
                          disabled={disabled}
                          onSubmit={() => handleSubmit(rowKey)}
                          onAbort={() => handleAbort(rowKey)}
                          onRestart={() => handleRestart(rowKey)}
                        />
                      </td>

                      <td className="text-gray-500 pb-2">
                        {row.status === "locked" && "Locked"}
                        {row.status === "active" && "Ready"}
                        {row.status === "processing" && "Processing"}
                        {row.status === "completed" && "Completed"}
                        {row.status === "aborted" && "Aborted"}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Feeding;
