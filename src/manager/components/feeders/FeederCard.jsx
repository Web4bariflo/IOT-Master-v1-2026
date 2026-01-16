import Feeder from "../../../assets/Images/FeedersActive.png";
import { useState } from "react";
const FeederCard = ({ feeder }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="bg-[#F7F7F9] border border-gray-200 rounded-lg overflow-hidden">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={Feeder} alt="Feeder" className="w-9 h-9" />

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {feeder.id}
              </span>
              <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-600">
                Pause
              </span>
            </div>
            <p className="text-[11px] text-gray-500">
              Applies to all feeders in feeding Module
            </p>
          </div>
        </div>

        {/* Toggle */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setActive(!active)}
        >
          {/* Label */}
          <span
            className={`text-xs font-medium ${
              active ? "text-green-600" : "text-gray-500"
            }`}
          >
            {active ? "ON" : "OFF"}
          </span>

          {/* Toggle */}
          <div
            className={`w-10 h-5 rounded-full relative transition-colors ${
              active ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow transition-transform ${
                active ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200" />

      {/* TIME SECTION */}
      <div className="flex justify-between px-4 py-3 text-sm">
        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">Next Feed :</span>
          <input
            value="13:00"
            disabled
            className="w-20 text-center border rounded bg-white text-gray-700 text-sm py-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="font-medium text-gray-700">End Time :</span>
          <input
            value="13:00"
            disabled
            className="w-20 text-center border rounded bg-white text-gray-700 text-sm py-1"
          />
        </div>
      </div>

      {/* DIVIDER */}
      <div className="border-t border-gray-200" />

      {/* FOOTER */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#EFEFF2]">
        {/* Feed Dropdown */}
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-gray-700">Feed :</span>
          <select className="border rounded px-2 py-1 bg-white text-gray-700">
            <option>400 Kg</option>
            <option>600 Kg</option>
            <option>800 Kg</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
        <button
          disabled={!active}
          className={`px-3 py-1 text-xs font-medium rounded text-white transition
            ${
              active
                ? "bg-[#2F80ED] hover:bg-blue-600"
                : "bg-blue-300 cursor-not-allowed"
            }`}
        >
          Start Schedule
        </button>

        <button
          disabled={!active}
          className={`px-3 py-1 text-xs font-medium rounded text-white transition
            ${
              active
                ? "bg-[#EB5757] hover:bg-red-600"
                : "bg-red-300 cursor-not-allowed"
            }`}
        >
          Abort
        </button>
      </div>
      </div>
    </div>
  );
};

export default FeederCard;
