import Feeder from "../../../assets/Images/FeedersActive.png";

const FeedingStatusBanner = ({ applyAll }) => {
  return (
   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#FFF7E6] rounded-xl px-4 sm:px-6 py-4 gap-3">
  <div className="flex items-center gap-4">
    <div className="w-12 h-12 flex items-center justify-center">
      <img src={Feeder} alt="Feeder" className="w-10 h-10 object-contain" />
    </div>
    <div className="text-sm text-gray-800">
      <p className="font-semibold text-gray-900">Feeding Paused</p>
      <p className="mt-1 text-sm font-semibold text-gray-800">
        Feeding Window:
        <span className="ml-1">6:00 AM – 6:34 AM</span>
        <span className="mx-3 text-gray-400">|</span>
        Totals:
        <span className="ml-1">2 Days &gt; 1200 Kg / Day</span>
      </p>
    </div>
  </div>

  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
    <button
      disabled={applyAll}
      className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition ${
        applyAll ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
      }`}
    >
      Start Schedule
    </button>
    <button
      disabled={applyAll}
      className={`px-4 py-2 text-sm font-semibold text-white rounded-lg transition ${
        applyAll ? "bg-gray-300 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
      }`}
    >
      Abort
    </button>
  </div>
</div>
  );
};

export default FeedingStatusBanner;
