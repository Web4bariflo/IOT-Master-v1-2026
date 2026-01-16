import { useState } from "react";
import Feeder from "../../../assets/Images/FeedersActive.png";

const feeders = [
  { id: "789458", battery: 60, status: "online", signal: 2 },
  { id: "789459", battery: 50, status: "online", signal: 3 },
  { id: "789460", battery: 60, status: "online", signal: 3 },
  { id: "789461", battery: 20, status: "alert", signal: 3 },
];

const AutoFeederStatusPanel = () => {
  const [activeTab, setActiveTab] = useState("all");

  const filteredFeeders =
    activeTab === "all"
      ? feeders
      : feeders.filter((f) => f.status === activeTab);

  return (
    <div className="w-80 bg-white border rounded-xl shadow-sm overflow-hidden font-sans">
      {/* HEADER */}
      <div className="flex items-center justify-between px-4 py-3 bg-green-50 border-b">
        <h3 className="text-sm font-semibold text-gray-800">
          Auto Feeders – Pond 1
        </h3>
        <span className="text-gray-400 text-lg cursor-pointer">›</span>
      </div>

      {/* TABS */}
      <div className="flex text-xs font-medium text-gray-500 border-b">
        {["all", "online", "alert"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 transition ${
              activeTab === tab
                ? "text-blue-600 border-b-2 border-blue-600"
                : "hover:text-gray-700"
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* DEVICE LIST */}
      <div className="p-3 space-y-2 bg-gray-50">
        {filteredFeeders.map((f) => {
          const batteryColor =
            f.battery > 50
              ? "text-green-600"
              : f.battery > 20
              ? "text-orange-500"
              : "text-red-500";

          return (
            <div
              key={f.id}
              className={`relative flex items-center gap-3 p-3 rounded-lg bg-white border ${
                f.status === "alert"
                  ? "border-red-300 bg-red-50"
                  : "border-gray-200"
              }`}
            >
              {/* ICON */}
              <div className="w-10 h-10 ">
                <img src={Feeder} alt="feeder" className="w-8 h-8" />
              </div>

              {/* DETAILS */}
              <div className="flex-1">
                <div className="text-sm font-semibold text-gray-800">
                  {f.id}
                </div>

                <div className="flex items-center mt-1">
                  {/* Battery */}
                  <div className={`flex items-center gap-1 ${batteryColor}`}>
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <rect x="2" y="6" width="18" height="12" rx="2" />
                      <rect x="20" y="10" width="2" height="4" rx="1" />
                    </svg>
                    <span className="text-xs font-medium">{f.battery}%</span>
                  </div>

                  {/* SIGNAL */}
                  <div className="flex gap-0.5 ml-auto">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1.5 h-3 rounded-sm ${
                          i < f.signal ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              {f.status === "alert" && (
                <div className="absolute top-2 right-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AutoFeederStatusPanel;
