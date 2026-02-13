import { useMemo, useState } from "react";
import Feeder from "../../../assets/Images/FeedersActive.png";

const FeederCard = ({ feeder, tasks = [], applyAll }) => {
  const active = applyAll;
  const [selectedCycle, setSelectedCycle] = useState(1);

  /* ======================================================
     DERIVED DATA
  ====================================================== */

  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => a.cycleNo - b.cycleNo);
  }, [tasks]);

  const currentTask = sortedTasks.find(
    (t) => t.cycleNo === selectedCycle,
  );

  const hasTasks = sortedTasks.length > 0;

  /* ======================================================
     UI
  ====================================================== */

  return (
    <div className="bg-[#F7F7F9] border border-gray-200 rounded-lg overflow-hidden">
      {/* ================= HEADER ================= */}
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <img src={Feeder} alt="Feeder" className="w-9 h-9" />

          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-800">
                {feeder.device_id}
              </span>

              <span className="text-xs px-2 py-0.5 rounded bg-gray-200 text-gray-600">
                {hasTasks ? "Active" : "No Cycles"}
              </span>
            </div>

            <p className="text-[11px] text-gray-500">
              Feeding dashboard view
            </p>
          </div>
        </div>

        {/* Toggle (display only) */}
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-medium ${
              active ? "text-green-600" : "text-gray-500"
            }`}
          >
            {active ? "ON" : "OFF"}
          </span>
          <div
            className={`w-10 h-5 rounded-full relative ${
              active ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full absolute top-0.5 shadow ${
                active ? "translate-x-5" : "translate-x-0.5"
              }`}
            />
          </div>
        </div>
      </div>

      {/* ================= BODY ================= */}
      {!hasTasks ? (
        /* EMPTY STATE */
        <div className="px-4 py-6 text-center text-sm text-gray-500">
          No feeding cycles generated for this feeder
        </div>
      ) : (
        <>
          {/* TIME SECTION */}
          <div className="flex justify-between px-4 py-3 text-sm items-center gap-4">
            {/* Start Time */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">
                Start :
              </span>
              <input
                value={currentTask?.startTime || "--"}
                disabled
                className="w-20 text-center border rounded bg-white text-gray-700 text-sm py-1"
              />
            </div>

            {/* End Time */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">
                End :
              </span>
              <input
                value={currentTask?.endTime || "--"}
                disabled
                className="w-20 text-center border rounded bg-white text-gray-700 text-sm py-1"
              />
            </div>

            {/* Feed Weight */}
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-700">
                Feed :
              </span>
              <input
                value={
                  currentTask?.feedWeight
                    ? `${currentTask.feedWeight} Kg`
                    : "--"
                }
                disabled
                className="w-24 text-center border rounded bg-white text-gray-700 text-sm py-1"
              />
            </div>
          </div>

          {/* ================= FOOTER ================= */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#EFEFF2]">
            {/* Cycle Selector */}
            <div className="flex items-center gap-2 text-sm">
              <span className="font-medium text-gray-700">
                Cycle :
              </span>
              <select
                value={selectedCycle}
                onChange={(e) =>
                  setSelectedCycle(Number(e.target.value))
                }
                className="border rounded px-2 py-1 bg-white text-gray-700 text-sm"
              >
                {sortedTasks.map((task) => (
                  <option
                    key={task.taskId}
                    value={task.cycleNo}
                  >
                    {task.cycleNo}
                  </option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div className="text-xs font-medium px-3 py-1 rounded bg-white border">
              Status :
              <span
                className={`ml-1 ${
                  currentTask?.status === "completed"
                    ? "text-green-600"
                    : currentTask?.status === "aborted"
                    ? "text-red-600"
                    : "text-orange-600"
                }`}
              >
                {currentTask?.status || "pending"}
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default FeederCard;
