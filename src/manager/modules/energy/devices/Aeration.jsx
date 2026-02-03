import React, { useState } from "react";
import DeviceCard from "../../../components/DeviceCard";
import aeration from "../../../../assets/Images/aeration device.png";
import ActionButton from "../../../components/ActionButton";

// Static device list
const DEVICE_IDS = ["DEV-01", "DEV-02", "DEV-03"];

const Aeration = () => {
  // Selected device and cycle input
  const [deviceId, setDeviceId] = useState("");
  const [cycleCount, setCycleCount] = useState("");

  // Stores device → number of cycles
  const [deviceCycles, setDeviceCycles] = useState({});

  // Per-row lifecycle state
  // rowStates[rowKey] = { status, startTime, endTime, timerId }
  const [rowStates, setRowStates] = useState({});

  // Lock device selector when all devices are generated
  const isLocked = Object.keys(deviceCycles).length === DEVICE_IDS.length;

  /* ---------------------------------------------------
     Utility: calculate duration between start & end time
  ---------------------------------------------------- */
  const getDurationMs = (start, end) => {
    if (!start || !end) return 0;

    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);

    return ((eh * 60 + em) - (sh * 60 + sm)) * 60 * 1000;
  };

  /* ---------------------------------------------------
     Generate cycles for selected device
  ---------------------------------------------------- */
  const handleGenerate = () => {
    if (!deviceId || !cycleCount) return;

    setDeviceCycles((prev) => ({
      ...prev,
      [deviceId]: cycleCount,
    }));
  };

  /* ---------------------------------------------------
     Handle time input change per row
  ---------------------------------------------------- */
  const handleTimeChange = (rowKey, field, value) => {
    setRowStates((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        [field]: value,
      },
    }));
  };

  /* ---------------------------------------------------
     Submit cycle → Processing → Auto Completed
  ---------------------------------------------------- */
  const handleSubmit = (rowKey) => {
    const row = rowStates[rowKey];
    if (!row?.startTime || !row?.endTime) return;

    const duration = getDurationMs(row.startTime, row.endTime);
    if (duration <= 0) return;

    // Auto-complete after time duration
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

  /* ---------------------------------------------------
     Abort cycle → clear time inputs
  ---------------------------------------------------- */
  const handleAbort = (rowKey) => {
    const timer = rowStates[rowKey]?.timerId;
    if (timer) clearTimeout(timer);

    setRowStates((prev) => ({
      ...prev,
      [rowKey]: {
        status: "aborted",
        startTime: "",
        endTime: "",
        timerId: null,
      },
    }));
  };

  /* ---------------------------------------------------
     Restart aborted cycle
  ---------------------------------------------------- */
  const handleRestart = (rowKey) => {
    setRowStates((prev) => ({
      ...prev,
      [rowKey]: {
        ...prev[rowKey],
        status: "idle",
      },
    }));
  };

  return (
    <div>
      {/* ================= TOP CONTROLS ================= */}
      <div className="flex items-center gap-6 text-sm p-4">
        {/* Device selector */}
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Device Id :</label>
          <select
            disabled={isLocked}
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            className={`border rounded px-2 py-1 text-sm ${
              isLocked ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          >
            <option value="">Select</option>
            {DEVICE_IDS.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        {/* Cycle count */}
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Aeration cycle :</label>
          <input
            type="number"
            min={1}
            disabled={isLocked}
            value={cycleCount}
            onChange={(e) => setCycleCount(Number(e.target.value))}
            className={`w-16 border rounded px-2 py-1 text-sm ${
              isLocked ? "bg-gray-100 cursor-not-allowed" : ""
            }`}
          />
        </div>

        {/* Generate */}
        {!isLocked && (
          <button
            onClick={handleGenerate}
            className="px-4 py-1 rounded bg-blue-600 text-white text-xs hover:bg-blue-700"
          >
            Generate
          </button>
        )}
      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex gap-6 items-start px-4">
        {/* Left card */}
        <DeviceCard title="Aeration" icon={aeration} />

        {/* Right table */}
        <div className="flex-1 border rounded-lg p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-left">
                <th className="pb-2">Device Id</th>
                <th className="pb-2">Cycle No.</th>
                <th className="pb-2">Start Time</th>
                <th className="pb-2">End Time</th>
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
                  const rowState = rowStates[rowKey] || { status: "idle" };
                  const isDisabled =
                    rowState.status === "processing" ||
                    rowState.status === "completed";

                  return (
                    <tr key={rowKey} className="hover:bg-gray-50 py-2">
                      <td className="py-2">{devId}</td>
                      <td className="py-2">C{i + 1}</td>

                      <td className="py-2">
                        <input
                          type="time"
                          value={rowState.startTime || ""}
                          disabled={isDisabled}
                          onChange={(e) =>
                            handleTimeChange(
                              rowKey,
                              "startTime",
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1"
                        />
                      </td>

                      <td className="py-2">
                        <input
                          type="time"
                          value={rowState.endTime || ""}
                          disabled={isDisabled}
                          onChange={(e) =>
                            handleTimeChange(
                              rowKey,
                              "endTime",
                              e.target.value
                            )
                          }
                          className="border rounded px-2 py-1"
                        />
                      </td>

                      <td className="py-2">
                        <ActionButton
                          status={rowState.status}
                          onSubmit={() => handleSubmit(rowKey)}
                          onAbort={() => handleAbort(rowKey)}
                          onRestart={() => handleRestart(rowKey)}
                        />
                      </td>

                      <td className="text-gray-500 py-2">
                        {rowState.status === "idle" && "Ready"}
                        {rowState.status === "processing" && "Processing"}
                        {rowState.status === "aborted" && "Aborted"}
                        {rowState.status === "completed" && "Completed"}
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

export default Aeration;
