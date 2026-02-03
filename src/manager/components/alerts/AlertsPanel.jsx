import DefaultFeeder from "../../../assets/Images/checktrayActive.png";

const AlertsPanel = ({ feederImage })  => {
  return (
    <div className="bg-[#FFECEC] border border-[#F5C2C2] rounded-xl p-3 space-y-3">
      
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-gray-800">Alerts</h3>
        <i className="bi bi-exclamation-triangle-fill text-yellow-500 text-sm"></i>
      </div>

      {/* ALERT CARD */}
      <div className="bg-[#FFF1F1] rounded-lg px-3 py-3">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            
            {/* 🔑 IMAGE CONTROLLED BY PROP */}
            <img
              src={feederImage || DefaultFeeder}
              alt="alert"
              className="w-8 h-8"
            />

            <div>
              <span className="text-sm font-semibold text-gray-800">
                789458
              </span>
              <p className="text-xs text-gray-700 mt-1">
                Low Hopper
              </p>
            </div>
          </div>

          <span className="text-[11px] text-gray-400">
            15 minutes ago
          </span>
        </div>

        <div className="flex items-center gap-2 mt-3">
          <button className="px-3 py-1 text-xs rounded bg-white border">
            Acknowledge
          </button>
          <button className="px-3 py-1 text-xs rounded bg-white border">
            History
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertsPanel;
