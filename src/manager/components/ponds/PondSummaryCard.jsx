const PondSummaryCard = () => {
  return (
    <div className="border rounded-lg p-4 text-sm bg-white space-y-5">
      {/* ===== WEATHER / ENV STATS ===== */}
      <div className="grid grid-cols-2 gap-4 pb-4 border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 text-lg">
            💧
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-lg">41%</p>
            <p className="text-xs text-gray-500">Humidity</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-50 text-green-600 text-lg">
            🌬️
          </div>
          <div>
            <p className="font-semibold text-gray-800 text-lg">2 km/h</p>
            <p className="text-xs text-gray-500">Wind Speed</p>
          </div>
        </div>
      </div>

      {/* ===== WORKER ASSIGNED ===== */}
      <div className="pb-4 border-b space-y-3">
        {/* Header Row */}
        <div className="flex items-center justify-between">
          <p className="font-medium text-gray-700">Worker Assigned</p>
          <h1 className="font-semibold text-gray-800 text-lg">Pond P1</h1>
        </div>

        {/* Worker Info */}
        <div className="flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/40"
            alt="worker"
            className="w-10 h-10 rounded-full border"
          />
          <div>
            <p className="font-semibold text-gray-800">Trinath pal</p>
            <p className="text-xs text-gray-500">+91 98675 43785</p>
          </div>
        </div>
      </div>

      {/* ===== WATER DEPTH ===== */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-cyan-50 text-cyan-600 text-lg">
            🌊
          </div>
          <span className="text-gray-600">Water Depth</span>
        </div>
        <span className="font-semibold text-gray-800 text-lg">12.3 m</span>
      </div>
    </div>
  );
};

export default PondSummaryCard;
