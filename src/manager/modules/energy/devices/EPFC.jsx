import React, { useState } from "react";
import DeviceCard from "../../../components/DeviceCard";
import epfc from "../../../../assets/Images/transformer.png";

// Static device list
const DEVICE_IDS = ["DEV-01", "DEV-02", "DEV-03"];

const EPFC = () => {
  const [deviceId, setDeviceId] = useState("");
  const [cycleCount, setCycleCount] = useState("");
  const [deviceCycles, setDeviceCycles] = useState({});

  const isLocked = Object.keys(deviceCycles).length === DEVICE_IDS.length;

  const handleGenerate = () => {
    if (!deviceId || !cycleCount) return;
    if (deviceCycles[deviceId]) return;

    setDeviceCycles((prev) => ({
      ...prev,
      [deviceId]: Number(cycleCount),
    }));

    setDeviceId("");
    setCycleCount("");
  };

  return (
    <div className="space-y-6">
      {/* ================= TOP CONTROLS ================= */}
      <div className="flex items-center gap-8 text-sm px-6">
        <div className="flex items-center gap-2">
          <label className="text-gray-500">Device Id:</label>
          <select
            disabled={isLocked}
            value={deviceId}
            onChange={(e) => setDeviceId(e.target.value)}
            className="border rounded-md px-3 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
          >
            <option value="">Select</option>
            {DEVICE_IDS.map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-gray-500">Cycles:</label>
          <input
            type="number"
            min={1}
            value={cycleCount}
            onChange={(e) => setCycleCount(e.target.value)}
            className="w-20 border rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-400"
          />
        </div>

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
      <div className="flex gap-6 items-start px-6">
        <DeviceCard title="APFC" icon={epfc} />

        <div className="flex-1 border rounded-lg p-4">
          <table className="w-full text-sm border-separate border-spacing-y-4">
            <thead>
              <tr className="text-gray-500 text-left">
                <th className="px-3">Device</th>
                <th className="px-3">Cycle</th>
                <th className="px-3">Metrics</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(deviceCycles).length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-10 text-gray-400">
                    Select device and cycles, then generate
                  </td>
                </tr>
              )}

              {Object.entries(deviceCycles).map(([device, count]) =>
                Array.from({ length: count }).map((_, index) => (
                  <tr key={`${device}-${index}`} className="border rounded-lg">
                    {/* DEVICE */}
                    <td className="px-4 py-4 font-medium text-gray-700 border-r">
                      {device}
                    </td>

                    {/* CYCLE */}
                    <td className="px-4 py-4 font-medium text-gray-700 border-r">
                      C{index + 1}
                    </td>

                    {/* METRICS */}
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-3 text-xs">
                        {/* TOP ROW */}
                        <div className="grid grid-cols-7 items-center text-center">
                          <span className="text-gray-400">L1</span>
                          <span className="text-red-500 font-semibold">
                            0 A
                          </span>
                          <span className="text-gray-600 font-medium">
                            66 A
                          </span>

                          <span />

                          <span className="text-gray-400">L2</span>
                          <span className="text-red-500 font-semibold">
                            0 A
                          </span>
                          <span className="text-gray-600 font-medium">
                            21 A
                          </span>
                        </div>

                        <div className="h-px bg-gray-200" />

                        {/* BOTTOM ROW */}
                        <div className="grid grid-cols-7 items-center text-center">
                          <span className="font-semibold">428 V</span>
                          <span />
                          <span className="font-semibold text-green-600">
                            0 KVA
                          </span>

                          <div className="flex justify-center">
                            <div className="w-px h-6 bg-gray-300" />
                          </div>

                          <span className="font-semibold text-red-500">
                            0 PF
                          </span>
                          <span />
                          <span className="font-semibold">0/0 KVAR</span>
                        </div>
                      </div>
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

export default EPFC;
