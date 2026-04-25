
import React from "react";
import { useParams } from "react-router-dom";

import DeviceCard from "../../../components/DeviceCard";
import feedingIcon from "../../../../assets/Images/FeedersActive.png";
import useFeedingData from "../../../hooks/useFeedingData";
import ActionButton from "../../../components/ActionButton";

const Feeding = () => {
  const { pondId } = useParams();
  const URL = process.env.REACT_APP_IP;
  const [fillingTime, setFillingTime] = React.useState("");

  const {
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
    handleAbort,
    handleRestart,
  } = useFeedingData(pondId);

  // Records current time when a cycle is started
  const handleStart = (row) => {
    const now = new Date();
    const hh = String(now.getHours()).padStart(2, "0");
    const mm = String(now.getMinutes()).padStart(2, "0");
    const ss = String(now.getSeconds()).padStart(2, "0");
    setFillingTime(`${hh}:${mm}:${ss}`);
  };

  const getActionConfig = (row) => {
    if (row.status?.toLowerCase() === "processing") {
      return {
        label: "Abort",
        className: "bg-red-600 hover:bg-red-700",
        disabled: false,
        onClick: () => handleAbort(row),
      };
    }

    return null; // 👈 nothing for other states
  };

  //clear cycle for testing purpose
  const handleClearCycles = async (selectedDeviceId) => {
    if (!selectedDeviceId) {
      console.warn("No device selected");
      return;
    }

    try {
      const res = await fetch(`${URL}/taskclear/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          device: selectedDeviceId,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to clear cycles");
      }

      const data = await res.json();
      console.log("Clear cycles success:", data);

      // Avoid full reload if possible
      window.location.reload();
    } catch (error) {
      console.error("Error clearing cycles:");
    }
  };

  return (
    <div>
      {/* ================= TOP CONTROLS ================= */}
      <div className="flex items-center gap-4 text-sm p-4">
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Device :</label>
          <select
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select</option>
            {devices.map((d) => (
              <option key={d.device_id} value={d.device_id}>
                {d.device_id}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">Cycles :</label>
          <input
            type="number"
            min={1}
            className="w-16 border rounded px-2 py-1"
            value={cycleCount}
            onChange={(e) => setCycleCount(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">Feed (Kg) :</label>
          <input
            type="number"
            className="w-20 border rounded px-2 py-1"
            value={feedAmount}
            onChange={(e) => setFeedAmount(Number(e.target.value))}
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">Filling Time :</label>
          <input
            type="text"
            readOnly
            placeholder="--:--:--"
            value={fillingTime}
            className="w-24 border rounded px-2 py-1 bg-gray-50 text-gray-700 cursor-not-allowed"
          />
        </div>

        <button
          onClick={handleGenerate}
          disabled={tasks.length > 0}
          className={`px-4 py-1 text-xs rounded text-white
        ${tasks.length > 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
            }`}
        >
          Generate
        </button>
        <button
          onClick={() => handleClearCycles(selectedDeviceId)}
          className="px-4 py-1 text-xs rounded text-white bg-red-600 hover:bg-red-700"
        >
          Clear cycle
        </button>
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex gap-6 px-4 py-4">
        <DeviceCard title="Feeding" icon={feedingIcon} />

        <div className="flex-1">
          <div className="border rounded-lg shadow-sm overflow-hidden">
            {/* ================= TABLE HEADER ================= */}
            {selectedDeviceId && (
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
                <div>
                  <div className="font-semibold text-gray-800">
                    Device ID: {selectedDeviceId}
                  </div>
                  <div className="text-xs text-gray-500">
                    Cycles: {tasks.length || 0} • Feed:{" "}
                    {feedAmount ? `${feedAmount} Kg` : "--"}
                  </div>
                </div>

                <button
                  onClick={handleSubmitAll}
                  className="px-3 py-1 text-xs rounded bg-green-600 text-white hover:bg-green-700"
                >
                  Submit All
                </button>
              </div>
            )}

            {/* ================= TABLE ================= */}
            <div className="p-4">
              <table className="w-full text-sm">
                <thead className="text-gray-400 border-b">
                  <tr>
                    <th className="text-left">Cycle</th>
                    <th className="text-left">Start</th>
                    <th className="text-left">End</th>
                    <th className="text-left">Feed %</th>
                    <th className="text-left">Worker</th>
                    <th className="text-left">Action</th>
                    <th className="text-left">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {tasks.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center py-10 text-gray-400"
                      >
                        No cycles generated yet
                      </td>
                    </tr>
                  ) : (
                    tasks.map((row, index) => {
                      const isLast = index === tasks.length - 1;
                      const computedRow = row;

                      return (
                        <tr key={computedRow.taskId} className="hover:bg-gray-50">
                          <td>C {index + 1}</td>

                          <td>
                            <input
                              type="time"
                              className="border rounded px-2 h-7 text-xs"
                              value={computedRow.startTime}
                              onChange={(e) =>
                                updateTask(
                                  computedRow.taskId,
                                  "startTime",
                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          <td>
                            <input
                              type="time"
                              disabled
                              className="border rounded px-2 h-7 text-xs bg-gray-100"
                              value={computedRow.endTime}
                            />
                          </td>

                          <td>
                            <input
                              className={`border rounded px-2 h-7 text-xs w-16 ${isLast ? "bg-gray-100 cursor-not-allowed" : ""
                                }`}
                              value={computedRow.feedWeight}
                              disabled={isLast}
                              onChange={(e) =>
                                updateTask(
                                  computedRow.taskId,
                                  "feedWeight",

                                  e.target.value,
                                )
                              }
                            />
                          </td>

                          <td>
                            <select
                              className="border rounded px-2 h-7 text-xs"
                              value={computedRow.worker || ""}
                              onChange={(e) =>
                                updateTask(computedRow.taskId, "worker", e.target.value)
                              }
                            >
                              <option value="">Select</option>
                              {workers.map((w, i) => (
                                <option key={i} value={w}>
                                  {w}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td>
                            {(() => {
                              const action = getActionConfig(computedRow);

                              if (!action) return null; // 👈 important

                              return (
                                <button
                                  disabled={action.disabled}
                                  onClick={action.onClick}
                                  className={`text-xs px-2 py-1 rounded text-white ${action.className}`}
                                >
                                  {action.label}
                                </button>
                              );
                            })()}
                          </td>

                          <span
                            className={`px-2 py-0.5 rounded-full text-xs capitalize
                          ${computedRow.status === "processing"
                                ? "bg-yellow-100 text-yellow-700"
                                : computedRow.status === "completed"
                                  ? "bg-green-100 text-green-700"
                                  : computedRow.status === "aborted"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-gray-100 text-gray-600"
                              }`}
                          >
                            {computedRow.status}
                          </span>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feeding;