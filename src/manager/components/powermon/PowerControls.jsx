
import { useState } from "react";

export default function PowerControls() {
  // const [isOn, setIsOn] = useState(false);
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="flex justify-between border rounded py-2 px-4 items-center">

      {/* Left Section */}
      <div className="flex gap-3 items-center">
        <span className="font-bold">
          Apply to Powermon in Pond P1
        </span>
        {/* Toggle Switch */}
        <div
        onClick={() => setIsOn(!isOn)} 
        className={`w-14 h-7 flex items-center rounded-full p-1 cursor-pointer transition ${
          isOn ? "bg-green-500" : "bg-gray-300"
        }`}>
          <div className={`w-5 h-5 bg-white rounded-full transform transition ${
            isOn ? "translate-x-7" : "translate-x-0"
          }`}>
          </div>
        </div>
        <span>
            {isOn ? "ON" : "OFF"}
        </span>
      </div>

      {/* Right Section */}
      <div className="flex gap-6 flex-col">

        <div className="flex gap-4">
          <div className="flex gap-2 items-center">
          <label>Start Time:</label>
          <input type="time" className="border p-1 rounded" />
        </div>

        <div className="flex gap-2 items-center">
          <label>End Time:</label>
          <input type="time" className="border p-1 rounded"/>
        </div>
        </div>

        <div className="flex gap-8">
          <div className="flex gap-2 items-center">
          <label>PF:</label>
          <input type="number" className="border p-1 w-16 rounded" />
        </div>

        <div className="flex gap-2 items-center">
          <label>Cycle Count:</label>
          <input type="number" className="border p-1 w-16 rounded" />
        </div>
        </div>

      </div>
    </div>
  );
}