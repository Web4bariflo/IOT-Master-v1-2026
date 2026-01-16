import Feeder from "../../../assets/Images/FeedersActive.png";

const AlertsPanel = () => {
  return (
    <div className="bg-[#FFECEC] border border-[#F5C2C2] rounded-xl p-3 space-y-3">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Alerts</h3>
      <i className="bi bi-exclamation-triangle-fill text-yellow-500 text-sm"></i>
      </div>

      {/* ALERT HEADER STRIP */}
      <div className="bg-[#FFF1F1] rounded-lg px-3 py-3">
        
        {/* TOP ROW */}
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <img src={Feeder} alt="feeder" className="w-8 h-8" />

            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-gray-800">
                  789458
                </span>
                
              </div>
              <p className="text-xs text-gray-700 mt-1">
                Low Hopper
              </p>
            </div>
          </div>

          <span className="text-[11px] text-gray-400">
            15 minutes ago
          </span>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-2 mt-3">
          <button className="px-3 py-1 text-xs font-medium rounded bg-white border border-gray-300 text-gray-700 hover:bg-gray-100">
            Acknowledge
          </button>

          <button className="px-3 py-1 text-xs font-medium rounded bg-white border border-gray-300 text-gray-600 hover:bg-gray-100">
            History
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
