const GlobalFeederControl = ({ applyAll, setApplyAll }) => {
  return (
    <div className="w-full bg-white rounded border border-gray-200 px-6 py-5 space-y-2">
      {/* Top Row */}
      <div className="flex items-center justify-between">
        {/* Left: Apply Toggle */}
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-gray-800">
            Apply to all feeders
            <span className="ml-1 text-gray-500">(Pond P1)</span>
          </span>

          {/* Toggle */}
          <div
            className="relative flex items-center cursor-pointer"
            onClick={() => setApplyAll(!applyAll)}
          >
            <div
              className={`w-12 h-6 rounded-full flex items-center px-1 transition-colors ${
                applyAll ? "bg-green-500" : "bg-gray-200"
              }`}
            >
              <div
                className={`w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${
                  applyAll ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </div>

            <span
              className={`ml-2 text-xs font-medium ${
                applyAll ? "text-green-600" : "text-gray-400"
              }`}
            >
              {applyAll ? "ON" : "OFF"}
            </span>
          </div>
        </div>

        {/* Right: Start & End Time */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <span className="text-gray-500">Start</span>
            <input
              type="time"
              disabled={!applyAll}
              className={`w-20 text-center border rounded-md py-1 text-sm ${
                applyAll ? "bg-white text-gray-700" : "bg-gray-50 text-gray-400"
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-500">End</span>
            <input
              type="time"
              disabled={!applyAll}
              className={`w-20 text-center border rounded-md py-1 text-sm ${
                applyAll ? "bg-white text-gray-700" : "bg-gray-50 text-gray-400"
              }`}
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-gray-600 font-medium">Feed</span>
            <div className="w-28 text-center border rounded-md py-1 bg-gray-100 text-gray-700 font-semibold">
              600 Kg
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100" />

      {/* Bottom Row */}
      <div className="flex items-center justify-end gap-6 text-sm">
        <button
          disabled={applyAll}
          className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition ${
            applyAll
              ? "bg-blue-500 hover:bg-blue-600"
              : "bg-gray-300 cursor-not-allowed"
          }`}
        >
          Start Schedule
        </button>
        <button
          disabled={applyAll}
          className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition ${
            applyAll
              ?"bg-red-500 hover:bg-red-600"
              :"bg-gray-300 cursor-not-allowed"
          }`}
        >
          Abort
        </button>
      </div>
    </div>
  );
};

export default GlobalFeederControl;
