import React, { useState } from "react";
import DeviceCard from "../../../components/DeviceCard";
import aeration from "../../../../assets/Images/aeration device.png";
import ActionButton from "../../../components/ActionButton";
const DEVICE_IDS = ["DEV-01", "DEV-02", "DEV-03"];

const Aeration = () => {
  const [deviceId, setDeviceId] = useState("");
  const [cycleCount, setCycleCount] = useState("");
  const [deviceCycles, setDeviceCycles] = useState({});
  const [submittingRows, setSubmittingRows] = useState(false);

  const isLocked = Object.keys(deviceCycles).length === DEVICE_IDS.length;

  const handleGenerate = () => {
    if (!deviceId || !cycleCount) return;

    setDeviceCycles((prev) => ({
      ...prev,
      [deviceId]: cycleCount,
    }));
  };

  const handleSubmit = (key) => {
    setSubmittingRows(true);
  };

  // const handleAbort = (key) => {
  //   setSubmittingRows((prev) => ({
  //     ...prev,
  //     [key]: false,
  //   }));
  // };

  return (
    <div>
      {/* TOP CONTROLS */}
      <div className="flex items-center gap-6 text-sm p-4">
        {/* Device ID */}
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Device Id :</label>
          <select
            disabled={isLocked}
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            className={`border rounded px-2 py-1 text-sm
              ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}
            `}
          >
            <option value="">Select</option>
            {DEVICE_IDS.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
        </div>

        {/* Cycle Count */}
        <div className="flex items-center gap-2">
          <label className="text-gray-600">Aeration cycle :</label>
          <input
            type="number"
            disabled={isLocked}
            min={1} 
            value={cycleCount}
            onChange={(e) => setCycleCount(Number(e.target.value))}
            className={`w-16 border rounded px-2 py-1 text-sm
              ${isLocked ? "bg-gray-100 cursor-not-allowed" : ""}
            `}
          />
        </div>

        {/* Generate Button */}
        {!isLocked && (
          <button
            onClick={handleGenerate}
            className="px-4 py-1 rounded bg-blue-600 text-white text-xs hover:bg-blue-700"
          >
            Generate
          </button>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="flex gap-6 items-start px-4">
        {/* Left Device Card */}
        <DeviceCard title="Aeration" icon={aeration} />

        {/* Right Table */}
        <div className="flex-1 border rounded-lg p-4">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-left">
                <th className="pb-2">Device Id</th>
                <th className="pb-2">Cycle No.</th>
                <th className="pb-2">Start Time</th>
                <th className="pb-2">End Time</th>
                <th className="pb-2"></th>
                <th className="pb-2"></th>
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
                Array.from({ length: count }, (_, i) => (
                  <tr key={`${devId}-C${i + 1}`} className="hover:bg-gray-50">
                    <td className="py-2">{devId}</td>
                    <td className="py-2">C{i + 1}</td>

                    <td className="py-2">
                      <input
                        type="time"
                        className="border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400"
                      />
                    </td>

                    <td className="py-2">
                      <input
                        type="time"
                        className="border rounded px-2 py-1 text-sm focus:ring-1 focus:ring-blue-400"
                      />
                    </td>

                    <td className="py-2" onClick={handleSubmit}>
                      <ActionButton
                        isSubmitting={submittingRows}
                        // onSubmit={() => handleSubmit(cycleKey)}
                        // onAbort={() => handleAbort(cycleKey)}
                      />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Aeration;
