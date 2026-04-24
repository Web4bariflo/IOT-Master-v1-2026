import React from "react";

const FarmCard = ({ task, feederImage }) => {

  const isEnabled = task.spray_cycle?.toLowerCase() === "yes";

  
  const formatTime = (isoString) => {
    if (!isoString) return "";

    const date = new Date(isoString);

    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };

  return (
    <div className="bg-[#F7F7F9] border border-gray-200 rounded-lg overflow-hidden">
      
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={feederImage} alt="Feeder" className="w-9 h-9" />

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {task.device_id}
              </span>

              <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-600">
                {task.status}
              </span>
            </div>

            <p className="text-[11px] text-gray-500">
              Applies to all feeders in feeding Module
            </p>
          </div>
        </div>

        {/* TOGGLE */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-medium ${
              isEnabled ? "text-green-600" : "text-gray-500"
            }`}
          >
            {isEnabled ? "ON" : "OFF"}
          </span>

          <div
            className={`w-10 h-5 rounded-full relative ${
              isEnabled ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow transition-transform ${
                isEnabled ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
        </div>
      </div>

      {/* TIME SECTION */}
      <div className="flex justify-between px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Start Time :</span>

          <input
            value={formatTime(task.start_time)}
            disabled
            className="w-20 text-center border rounded bg-white text-gray-700 text-sm py-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">End Time :</span>

          <input
            value={formatTime(task.stop_time)}
            disabled
            className="w-20 text-center border rounded bg-white text-gray-700 text-sm py-1"
          />
        </div>
      </div>

      <div className="border-t border-gray-200" />

      {/* FOOTER */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#EFEFF2]">
        <div className="flex gap-2">
          <p className="px-3 py-1 text-xs font-medium rounded">
            Water Level: {task.water_level}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FarmCard;