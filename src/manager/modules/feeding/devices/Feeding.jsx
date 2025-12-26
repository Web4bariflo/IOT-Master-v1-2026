import React, { useState } from "react";
import DeviceCard from "../../../components/DeviceCard";
import feeding from "../../../../assets/Images/FeedersActive.png";
import ActionButton from "../../../components/ActionButton";

const DEVICE_IDS = ["DEV-01", "DEV-02", "DEV-03"];
const WORKERS = ["Worker A", "Worker B", "Worker C"];

const Feeding = () => {
  const [deviceId, setDeviceId] = useState("");
  const [cycleCount, setCycleCount] = useState("");
  const [deviceCycles, setDeviceCycles] = useState({});
  const [rowStates, setRowStates] = useState({});

  const isLocked = Object.keys(deviceCycles).length === DEVICE_IDS.length;

  /* ================= Utility ================= */
  const getDurationMs = (start, end) => {
    if (!start || !end) return 0;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    return (eh * 60 + em - (sh * 60 + sm)) * 60 * 1000;
  };

  /* ================= Generate ================= */
  const handleGenerate = () => {
    if (!deviceId || !cycleCount) return;
    setDeviceCycles((prev) => ({ ...prev, [deviceId]: cycleCount }));
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
    const row = rowStates[rowKey];
    if (!row?.startTime || !row?.endTime || !row?.feedWeight || !row?.worker)
      return;

    const duration = getDurationMs(row.startTime, row.endTime);
    if (duration <= 0) return;

    const timerId = setTimeout(() => {
      setRowStates((prev) => ({
        ...prev,
        [rowKey]: {
          ...prev[rowKey],
          status: "completed",
          timerId: null,
        },
      }));
    }, duration);

    setRowStates((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        status: "processing",
        timerId,
      },
    }));
  };

  /* ================= Abort ================= */
  const handleAbort = (rowKey) => {
    const timer = rowStates[rowKey]?.timerId;
    if (timer) clearTimeout(timer);

    setRowStates((prev) => ({
      ...prev,
      [rowKey]: {
        status: "aborted",
        startTime: "",
        endTime: "",
        feedWeight: "",
        worker: "",
        timerId: null,
      },
    }));
  };

  /* ================= Restart ================= */
  const handleRestart = (rowKey) => {
    setRowStates((prev) => ({
      ...prev,
      [rowKey]: {
        status: "idle",
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
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select</option>
            {DEVICE_IDS.map((id) => (
              <option key={id}>{id}</option>
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
                  const disabled =
                    row.status === "processing" || row.status === "completed";

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
                          type="number"
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
                          {WORKERS.map((w) => (
                            <option key={w}>{w}</option>
                          ))}
                        </select>
                      </td>

                      <td className="pb-2">
                        <ActionButton
                          status={row.status}
                          onSubmit={() => handleSubmit(rowKey)}
                          onAbort={() => handleAbort(rowKey)}
                          onRestart={() => handleRestart(rowKey)}
                        />
                      </td>

                      <td className="text-gray-500 pb-2">
                        {row.status === "idle" && "Ready"}
                        {row.status === "processing" && "Processing"}
                        {row.status === "aborted" && "Aborted"}
                        {row.status === "completed" && "Completed"}
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
