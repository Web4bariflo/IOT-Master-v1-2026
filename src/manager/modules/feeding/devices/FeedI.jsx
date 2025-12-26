import React, { useState } from "react";
import DeviceCard from "../../../components/DeviceCard";
import feedI from "../../../../assets/Images/checktrayActive.png";

// Static device list
const DEVICE_IDS = ["DEV-01", "DEV-02", "DEV-03"];

/* -------------------- HELPERS -------------------- */
const formatTime = (date, format) => {
  if (format === "24") {
    return date.toTimeString().slice(0, 5);
  }

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  return `${hours}:${minutes} ${ampm}`;
};

/* -------------------- COMPONENT -------------------- */
const FeedI = () => {
  const [form, setForm] = useState({
    deviceId: "",
    cycleCount: "",
    startTime: "",
    feedType: "spray",
    hourFormat: "24",
  });

  const [deviceCycles, setDeviceCycles] = useState({});
  const isLocked = Object.keys(deviceCycles).length === DEVICE_IDS.length;

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  /* ----------- CORE LOGIC APPLIED HERE ----------- */
  const handleGenerate = () => {
    const { deviceId, cycleCount, startTime, feedType, hourFormat } = form;
    if (!deviceId || !cycleCount || !startTime) return;
    if (deviceCycles[deviceId]) return;

    const intervalHours = 24 / cycleCount;
    const startDate = new Date(`1970-01-01T${startTime}:00`);
    const cycles = [];

    for (let i = 0; i < cycleCount; i++) {
      const cycleStart = new Date(
        startDate.getTime() + i * intervalHours * 60 * 60 * 1000
      );

      const nextCycleStart = new Date(
        cycleStart.getTime() + intervalHours * 60 * 60 * 1000
      );

      cycles.push({
        deviceId,
        cycleNo: i + 1,
        interval: `${formatTime(cycleStart, hourFormat)} - ${formatTime(
          nextCycleStart,
          hourFormat
        )}`,
        feedType,
        status: "Ready",
      });
    }

    setDeviceCycles((prev) => ({
      ...prev,
      [deviceId]: cycles,
    }));

    setForm((prev) => ({
      ...prev,
      deviceId: "",
      cycleCount: "",
      startTime: "",
    }));
  };

  return (
    <div>
      {/* ================= TOP FORM ================= */}
      <div className="flex flex-wrap items-center gap-14 text-sm p-10">
        {/* Device */}
        <div className="flex items-center gap-2">
          <label className="text-gray-500">Device Id:</label>
          <select
            value={form.deviceId}
            onChange={(e) => updateForm("deviceId", e.target.value)}
            className="border rounded px-2 py-1"
          >
            <option value="">Select</option>
            {DEVICE_IDS.map((id) => (
              <option key={id}>{id}</option>
            ))}
          </select>
        </div>

        {/* Cycles */}
        <div className="flex items-center gap-2">
          <label className="text-gray-500">Feed Cycles:</label>
          <input
            type="number"
            min={1}
            max={24}
            value={form.cycleCount}
            onChange={(e) => updateForm("cycleCount", Number(e.target.value))}
            className="w-16 border rounded px-2 py-1"
          />
        </div>

        {/* Start Time + Format */}
        <div className="flex items-center gap-3">
          <label className="text-gray-500">Start Time</label>
          <input
            type="time"
            value={form.startTime}
            onChange={(e) => updateForm("startTime", e.target.value)}
            className="px-3 py-2 border rounded"
          />

          <div className="flex bg-gray-100 rounded-full">
            <button
              onClick={() => updateForm("hourFormat", "12")}
              className={`px-4 py-1 text-xs rounded-full ${
                form.hourFormat === "12"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              12H
            </button>
            <button
              onClick={() => updateForm("hourFormat", "24")}
              className={`px-4 py-1 text-xs rounded-full ${
                form.hourFormat === "24"
                  ? "bg-blue-600 text-white"
                  : "text-gray-600"
              }`}
            >
              24H
            </button>
          </div>
        </div>

        {/* Feed Type */}
        <div className="flex flex-col gap-2">
          <label className="flex gap-2 items-center">
            <input
              type="radio"
              checked={form.feedType === "spray"}
              onChange={() => updateForm("feedType", "spray")}
            />
            Spray Feed
          </label>
          <label className="flex gap-2 items-center">
            <input
              type="radio"
              checked={form.feedType === "nospray"}
              onChange={() => updateForm("feedType", "nospray")}
            />
            Without Spray Feed
          </label>
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

      {/* ================= CONTENT ================= */}
      <div className="flex gap-6 items-start px-6">
        <DeviceCard title="FeedI" icon={feedI} />

        <div className="flex-1 border rounded-lg p-6">
          <table className="w-full text-sm border-separate border-spacing-y-3">
            <thead>
              <tr className="text-gray-500 text-left">
                <th>Device Id</th>
                <th>Cycle</th>
                <th>Time Interval</th>
                <th>Image</th>
                <th>Water Level Depth</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {Object.keys(deviceCycles).length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center py-6 text-gray-400">
                    Fill the form and click Generate
                  </td>
                </tr>
              )}

              {Object.entries(deviceCycles).map(([devId, cycles]) =>
                cycles.map((c) => (
                  <tr
                    key={`${devId}-${c.cycleNo}`}
                    className="bg-white shadow-sm rounded-lg"
                  >
                    <td className="p-3">{devId}</td>
                    <td className="p-3">C{c.cycleNo}</td>
                    <td className="p-3 text-blue-600">{c.interval}</td>
                    <td className="p-3">--</td>
                    <td className="p-3">--</td>
                    <td className="p-3 text-green-600">{c.status}</td>
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

export default FeedI;
