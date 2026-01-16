import Feeder from "../../../assets/Images/FeedersActive.png";

const FeedingStatusBanner = () => {
  return (
    <div className="flex items-center justify-between  bg-[#FFF7E6] rounded-xl px-6 py-4">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Feeder Image */}
        <div className="w-12 h-12 flex items-center justify-center">
          <img src={Feeder} alt="Feeder" className="w-10 h-10 object-contain" />
        </div>

        {/* Text Content */}
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

      {/* Right Section: Actions */}
      <div className="flex gap-3">
        <button
          className="px-4 py-2 text-sm font-semibold 
                     text-white bg-blue-500 
                     rounded-lg hover:bg-blue-600 
                     transition"
        >
          Start Schedule
        </button>

        <button
          className="px-4 py-2 text-sm font-semibold 
                     text-white bg-red-500 
                     rounded-lg hover:bg-red-600 
                     transition"
        >
          Abort
        </button>
      </div>
    </div>
  );
};

export default FeedingStatusBanner;
