import React from "react";
import DeviceCard from "../../../components/DeviceCard";
import feedingIcon from "../../../../assets/Images/FeedersActive.png";
import ActionButton from "../../../components/ActionButton";
import useFeedingData from "../../../hooks/useFeedingData";
import { useParams } from "react-router-dom";

const Feeding = () => {
  const pondId = useParams().pondId;
  const {
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
    alerts,
    isLocked,
    loading,
    handleGenerate,
    handleRowChange,
    handleSubmit,
    handleAbort,
    handleRestart,
  } = useFeedingData(pondId);
  return (
    <div>
      {/* ================= TOP CONTROLS ================= */}
      <div className="flex items-center gap-4 text-sm p-4  ">
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Device :</label>
          <select
            disabled={isLocked}
            value={selectedDeviceId}
            onChange={(e) => setSelectedDeviceId(e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">{loading ? "Loading..." : "Select"}</option>
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
            disabled={isLocked}
            value={cycleCount}
            onChange={(e) => setCycleCount(Number(e.target.value))}
            className="w-16 border rounded px-2 py-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-600">Feed (Kg) :</label>
          <input
            type="number"
            disabled={isLocked}
            value={feedAmount}
            onChange={(e) => setFeedAmount(Number(e.target.value))}
            className="w-20 border rounded px-2 py-1"
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
      <div className="flex gap-6 px-4 py-4">
        <DeviceCard title="Feeding" icon={feedingIcon} />

        <div className="flex-1 space-y-6">
          {Object.keys(deviceCycles).length === 0 && (
            <div className="border rounded-lg py-10 text-center text-gray-400">
              Select device, set cycles and click Generate
            </div>
          )}

          {Object.entries(deviceCycles).map(([devId, meta]) => (
            <div
              key={devId}
              className="border rounded-lg shadow-sm  overflow-hidden"
            >
              {/* ================= DEVICE HEADER ================= */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
                <div>
                  <div className="font-semibold text-gray-800">
                    Device ID: {devId}
                  </div>
                  <div className="text-xs text-gray-500">
                    Feed: {meta.feedAmount} Kg • Cycles: {meta.cycles}
                  </div>
                </div>

                <span className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-700">
                  Feeding
                </span>
              </div>

              {/* ================= DEVICE ALERTS ================= */}
              {alerts?.[devId]?.length > 0 && (
                <div className="px-4 py-2 space-y-1 bg-yellow-50 border-b">
                  {alerts[devId].map((alert) => (
                    <div
                      key={alert.id}
                      className={`text-xs px-3 py-1 rounded border
                      ${
                        alert.type === "error"
                          ? "bg-red-100 text-red-700 border-red-200"
                          : "bg-green-100 text-green-700 border-green-200"
                      }`}
                    >
                      {alert.message}
                    </div>
                  ))}
                </div>
              )}

              {/* ================= CYCLE TABLE ================= */}
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
                    {Array.from({ length: meta.cycles }).map((_, i) => {
                      const rowKey = `${devId}-C${i + 1}`;
                      const row = rowStates[rowKey] || {};
                      const disabled = row.status !== "active";

                      return (
                        <tr key={rowKey} className="hover:bg-gray-50">
                          <td className="font-medium">C{i + 1}</td>

                          <td>
                            <input
                              type="time"
                              disabled={disabled}
                              value={row.startTime || ""}
                              onChange={(e) =>
                                handleRowChange(
                                  rowKey,
                                  "startTime",
                                  e.target.value,
                                )
                              }
                              className="h-7 px-2 border rounded text-xs"
                            />
                          </td>

                          <td>
                            <input
                              type="time"
                              disabled={true}
                              value={row.endTime || ""}
                              onChange={(e) =>
                                handleRowChange(
                                  rowKey,
                                  "endTime",
                                  e.target.value,
                                )
                              }
                              className="h-7 px-2 border rounded text-xs"
                            />
                          </td>

                          <td>
                            <input
                              disabled={disabled}
                              value={row.feedWeight || ""}
                              onChange={(e) =>
                                handleRowChange(
                                  rowKey,
                                  "feedWeight",
                                  e.target.value,
                                )
                              }
                              className="h-7 px-2 border rounded text-xs w-16"
                            />
                          </td>

                          <td>
                            <select
                              value={
                                rowStates[`${selectedDeviceId}-C1`]?.worker ||
                                ""
                              }
                              onChange={(e) =>
                                handleRowChange(
                                  `${selectedDeviceId}-C1`,
                                  "worker",
                                  e.target.value,
                                )
                              }
                            >
                              <option value="">Select Worker</option>
                              {workers.map((w, idx) => (
                                <option key={idx} value={w}>
                                  {w}
                                </option>
                              ))}
                            </select>
                          </td>

                          <td>
                            <ActionButton
                              status={row.status}
                              disabled={disabled}
                              onSubmit={() => handleSubmit(rowKey)}
                              onAbort={() => handleAbort(rowKey)}
                              onRestart={() => handleRestart(rowKey)}
                            />
                          </td>

                          <td>
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs
                              ${
                                row.status === "active"
                                  ? "bg-green-100 text-green-700"
                                  : row.status === "locked"
                                    ? "bg-gray-200 text-gray-600"
                                    : "bg-red-100 text-red-700"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feeding;
