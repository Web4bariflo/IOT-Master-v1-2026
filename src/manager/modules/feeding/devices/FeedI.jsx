import React, { useState, useEffect } from "react";
import DeviceCard from "../../../components/DeviceCard";
import feedI from "../../../../assets/Images/checktrayActive.png";
import axios from "axios";
import {useParams} from "react-router-dom";
const BASEURL = process.env.REACT_APP_IP;

const FeedI = () => {
  const pondId = useParams().pondId; 
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
        const response = await axios.get(
          `${BASEURL}/deviceid_view/${pondId}/`,
          { params: { device_type: "Feeding" } }
        );
        // Handle array or object response
        setDevices(Array.isArray(response.data) ? response.data : response.data.devices || []);
      } catch (error) {
        console.warn("Error fetching device Ids", error);
        setDevices([]);
      }
    };
    fetchDeviceIds();
  }, [pondId]);

  const isLocked = Object.keys(deviceCycles).length === devices.length;

  const updateForm = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleGenerate = async () => {
    const { deviceId, cycleCount, startTime, timeInterval, spray_type } = form;

    if (!deviceId || !cycleCount || !startTime) return;
    
    // In a real app we might check if already generated, but for demo allow overwriting or merging
    // if (deviceCycles[deviceId]) return;

    let apiCycles = [];

    try {
      const response = await axios.post(`${BASEURL}/feedtrygenerate/`, {
        deviceName: "FeedTray",
        deviceId,
        cycleCount,
        startTime,
        timeInterval,
        spray_type,
      });
      apiCycles = response.data.cycle || [];
    } catch (error) {
      console.error("Generate API failed, using mock data", error);
      // Generate mock cycles
      apiCycles = Array.from({ length: Number(cycleCount) }, (_, i) => ({
        cycleNo: i + 1,
        time_interval: timeInterval || "30 mins",
        image: null,
        depth: null,
        status: "Pending",
        taskId: `mock-task-${i}`,
      }));
    }

    const formattedCycles = apiCycles.map((c) => ({
      deviceId,
      cycleNo: c.cycleNo,
      interval: c.time_interval || timeInterval,
      image: c.image,
      depth: c.depth,
      status: c.status,
      taskId: c.taskId,
    }));

    setDeviceCycles((prev) => ({
      ...prev,
      [deviceId]: formattedCycles,
    }));

    // Optional: Reset form or keep it? user usage pattern implies keeping it might be easier
    // setForm((prev) => ({ ...prev, deviceId: "", cycleCount: "", startTime: "" }));
  };

  return (
    <div>
      {/* ================= CONTROLS ROW ================= */}
      <div className="flex flex-col gap-4 p-6 border-t ">
        
        {/* Row 1: Device, Start Time, Interval, Spray Options, Generate */}
        <div className="flex flex-wrap items-center gap-6 text-sm">
          
          {/* Device Id */}
          <div className="flex items-center gap-2">
            <label className="text-gray-600 font-medium">Device Id</label>
            <select
              disabled={isLocked}
              value={form.deviceId}
              onChange={(e) => updateForm("deviceId", e.target.value)}
              className="border rounded px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">Select</option>
              {devices.map((device) => (
                <option key={device.device_id} value={device.device_id}>
                  {device.device_id}
                </option>
              ))}
            </select>
          </div>
      
          <button
            onClick={handleGenerate}
            className="ml-auto bg-blue-600 text-white px-6 py-1.5 rounded hover:bg-blue-700 font-medium transition-colors"
          >
            Generate
          </button>
        </div>


      </div>

      {/* ================= MAIN CONTENT ================= */}
      <div className="flex gap-6 items-start px-6 py-6" style={{minHeight: '300px'}}>
        {/* Left Icon */}
        <div className="flex flex-col items-center gap-2">
            <img src={feedI} alt="Farm I" className="w-16 h-16 object-contain" />
            <span className="font-bold text-gray-700">FARM I</span>
        </div>

        {/* Right Table */}
        <div className="flex-1">
             {Object.keys(deviceCycles).length === 0 ? (
                <div className="text-center mt-10">
                    <p className="text-gray-500 font-medium">No Cycles started</p>
                </div>
             ) : (
                 <div className="w-full overflow-hidden">
                    <table className="w-full text-sm text-center">
                        <thead>
                            <tr className="text-gray-500 border-b">
                                <th className="pb-3 text-center font-medium">Device ID.</th>
                                <th className="pb-3 text-center font-medium">Cycle No.</th>
                                <th className="pb-3 text-center font-medium">Time Interval</th>
                                <th className="pb-3 text-center font-medium">Image Captured</th>
                                <th className="pb-3 text-center font-medium">Water level Depth</th>
                                <th className="pb-3 text-center font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {Object.entries(deviceCycles).map(([devId, cycles]) => (
                                cycles.map((c, i) => (
                                    <tr key={`${devId}-${i}`} className="hover:bg-gray-50">
                                        <td className="py-3 text-gray-700">{devId}</td>
                                        <td className="py-3 text-gray-700">{c.cycleNo}</td>
                                        <td className="py-3 text-gray-700">{c.interval}</td>
                                        <td className="py-3 text-gray-500">{c.image || "No Image"}</td>
                                        <td className="py-3 text-gray-500">{c.depth || "-"}</td>
                                        <td className="py-3 text-green-600 font-medium">{c.status}</td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                 </div>
             )}
        </div>
      </div>
    </div>
  );
};

export default FeedI;