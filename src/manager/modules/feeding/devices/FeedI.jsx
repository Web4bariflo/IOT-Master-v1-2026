import React, { useState } from "react";
import { useParams } from "react-router-dom";
import feedI from "../../../../assets/Images/checktrayActive.png";
import { useFarmingData } from "../../../hooks/useFarmingData";

import useFeedingData from "../../../hooks/useFeedingData";

const BASEURL = process.env.REACT_APP_IP;

const FeedI = () => {
  const { pondId } = useParams();

  const [deviceId, setDeviceId] = useState("");
  const [workerSelection, setWorkerSelection] = useState({});


  const { devices, setSelectedDevice, checktrayGenerate, tasks, handleSubmit, handleStartTimeChange, startTimes, handleDelete, isSubmitted,
    setIsSubmitted, workers } = useFarmingData(pondId);

  console.log(tasks);



  return (
    <div className="w-full px-6 py-6">

      {/* TOP CONTROLS */}
      <div className="flex items-center gap-4 mb-6">
        <img src={feedI} alt="farm" className="w-20 h-20 object-contain" />

        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-500">Device Id :</label>
          <select
            value={deviceId}
            onChange={(e) => {
              const value = e.target.value;
              setDeviceId(value);
              setSelectedDevice(value);
            }}
            className="h-9 px-4 rounded-full border border-gray-300 bg-gray-50 text-sm text-gray-700"
          >
            <option value="">Select</option>
            {devices.map((d) => (
              <option key={d.device_id} value={d.device_id}>
                {d.device_id}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={checktrayGenerate}
          className="ml-2 bg-blue-600 text-white px-6 py-1.5 rounded-md text-sm font-medium"
        >
          Generate
        </button>
      </div>

      {/* TABLE */}
      <div className="w-full">
        <table className="w-full text-sm text-center">
          <thead>
            <tr className="text-gray-400">
              <th className="py-3 font-medium">Device ID</th>
              <th className="font-medium">Start Time</th>
              <th className="font-medium">Stop Time</th>
              <th className="font-medium">Spray Cycle</th>
              <th className="font-medium">Image Update</th>
              <th className="font-medium">Water level</th>
              <th className="font-medium">Action</th>
              <th className="font-medium">Status</th>
              <th className="font-medium">Worker</th>
              <th className="font-medium">Remove</th>
              <th className="font-medium">Add New</th>
            </tr>
          </thead>

          <tbody>
            {tasks && tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.id} className="border-t">
                  <td className="py-3">{task.device_id}</td>

                  <td>
                    <input
                      type="datetime-local"
                      value={
                        startTimes[task.id] ||
                        (task.start_time ? task.start_time.replace(" ", "T") : "")
                      }
                      onChange={(e) =>
                        handleStartTimeChange(task.id, e.target.value)
                      }
                      className="border px-2 py-1 rounded"
                    />
                  </td>
                  <td>
                    {task.stop_time
                      ? new Date(task.stop_time).toLocaleTimeString()
                      : ""}
                  </td>


                  <td>{task.spray_cycle}</td>
                  <td>{task.image_update}</td>
                  <td>{task.water_level}</td>

                  <td>
                    <button
                      onClick={() => handleSubmit(task, workerSelection[task.id] || task.worker)}
                      disabled={
                        task.submit === "True" ||
                        !startTimes[task.id] ||
                        !(workerSelection[task.id] || task.worker)
                      }
                      className={`px-4 py-1 rounded text-white ${task.submit === "True" || !startTimes[task.id] || !(workerSelection[task.id] || task.worker)
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600"
                        }`}
                    >
                      Submit
                    </button>
                  </td>


                  <td>{task.status || "N/A"}</td>

                  <td>
                    <select
                      className="border rounded px-2 h-7 text-xs"
                      value={workerSelection[task.id] || task.worker || ""}
                      onChange={(e) =>
                        setWorkerSelection((prev) => ({
                          ...prev,
                          [task.id]: e.target.value,
                        }))
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

                  <td
                    onClick={() => handleDelete(task.id)}
                    className="px-2 mt-2 py-1 text-xs text-red-600 cursor-pointer hover:underline"
                  >
                    Delete
                  </td>

                  {/* ADD NEW COLUMN */}
                  <td>
                    <button
                      onClick={checktrayGenerate}
                      disabled={task.status !== "Completed"}
                      className={`px-3 py-1 rounded text-white text-lg
${task.status === "Completed"
                          ? "bg-blue-600 hover:bg-blue-700"
                          : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                      yes
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="py-16 text-gray-500">
                  No Cycles started
                </td>
              </tr>
            )}


          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedI;

