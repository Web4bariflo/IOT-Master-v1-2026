import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import feedI from "../../../../assets/Images/checktrayActive.png";
 
const BASEURL = process.env.REACT_APP_IP;
 
const FeedI = () => {
  const { pondId } = useParams();
 
  const [form, setForm] = useState({
    deviceId: "",
    cycleCount: "",
    startTime: "",
    timeInterval: "",
    spray_type: "spray",
  });
 
  const [devices, setDevices] = useState([]);
  const [deviceCycles, setDeviceCycles] = useState({});
 
  useEffect(() => {
    const fetchDeviceIds = async () => {
      if (!pondId) return;
      try {
        const res = await axios.get(
          `${BASEURL}/deviceid_view/${pondId}/`,
          { params: { device_type: "Feeding" } }
        );
        setDevices(Array.isArray(res.data) ? res.data : res.data.devices || []);
      } catch {
        setDevices([]);
      }
    };
    fetchDeviceIds();
  }, [pondId]);
 
  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };
 
  const handleGenerate = async () => {
    const { deviceId, cycleCount } = form;
    if (!deviceId || !cycleCount) return;
 
    setDeviceCycles((prev) => ({
      ...prev,
      [deviceId]: [],
    }));
  };
 
  return (
    <div className=" w-full px-6 py-6">
 
      {/* ================= TOP CONTROLS ================= */}
      <div className="flex items-center gap-4 mb-6">
       <img
  src={feedI}
  alt="farm"
  className="w-20 h-20 object-contain"
/>
{/* Device Id */}
 <div className="flex items-center gap-2">
    <label className="text-sm text-gray-500">Device Id :</label>
    <select
      value={form.deviceId}
      onChange={(e) => updateForm("deviceId", e.target.value)}
      className="h-9 px-4 rounded-full border border-gray-300 bg-gray-50 text-sm text-gray-700 focus:outline-none"
    >
      <option value="">Select</option>
      {devices.map((d) => (
        <option key={d.device_id} value={d.device_id}>
          {d.device_id}
        </option>
      ))}
    </select>
  </div>
 
       {/* Image Cycle */}
  <div className="flex items-center gap-2">
    <label className="text-sm text-gray-500">Image Cycle</label>
    <select
      value={form.cycleCount}
      onChange={(e) => updateForm("cycleCount", e.target.value)}
      className="h-9 px-4 rounded-full border border-gray-300 bg-gray-50 text-sm text-gray-700 focus:outline-none"
    >
      <option value="">0</option>
      {[1, 2, 3, 4].map((n) => (
        <option key={n} value={n}>{n}</option>
      ))}
    </select>
  </div>
 
        <button
          onClick={handleGenerate}
          className="ml-2 bg-blue-600 text-white px-6 py-1.5 rounded-md text-sm font-medium"
        >
          Generate
        </button>
      </div>
 
      {/* ================= FARM LABEL ================= */}
      <div className="flex items-center gap-3 mb-4">
        <span className="font-semibold text-sm">FARM I</span>
      </div>
 
      {/* ================= TABLE ================= */}
      <div className="w-full">
        <table className="w-full text-sm text-center">
          <thead>
            <tr className="text-gray-400">
              <th className="py-3 font-medium">Device ID.</th>
              <th className="font-medium">Cycle No.</th>
              <th className="font-medium">Spray Cycle</th>
              <th className="font-medium">Image Updated</th>
              <th className="font-medium">Water level Depth</th>
              <th className="font-medium">Status</th>
            </tr>
          </thead>
        </table>
 
        {/* EMPTY STATE */}
        <div className="text-center py-16 text-gray-500 text-sm">
          No Cycles started
        </div>
      </div>
    </div>
  );
};
 
export default FeedI;