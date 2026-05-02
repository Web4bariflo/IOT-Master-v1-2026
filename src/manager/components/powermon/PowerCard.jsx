import PowerMonImg from "../../../assets/Images/PowerMon.png";

export default function PowerCard({ session, onAbort }) {
    const isOn = session.status === "PROCESSING";

    return (
        <div className="border rounded shadow-sm bg-gray-50 p-4 w-full">

            {/* Top Section */}
            <div className="flex justify-between items-center border-b p-2 ">
                <div className="flex gap-4">
                    <img src={PowerMonImg} alt="" className="w-6 h-6" />
                <span>{session.id}</span>
                </div>

                <div className="flex gap-2">
                    <span>PF:</span>
                    <input type="number" className="rounded border w-14" />
                </div>

<div className=" flex gap-4">
                    {/* Toggle UI */}
                <div
                    className={`w-12 h-6 flex items-center rounded-full border px-1 transition duration-300 ${isOn ? "bg-green-300" : "bg-gray-500"
                        }`}
                >
                    <div
                        className={`w-4 h-4 rounded-full shadow-md bg-white transform transition duration-300 ${isOn ? "translate-x-6" : "translate-x-0"
                            }`}
                    ></div>
                </div>

                <span>{isOn ? "ON" : "OFF"}</span>
</div>
            </div>

            {/* Middle Section */}
            <div className="flex justify-between mb-2 items-center border-b p-2">
                <div className="flex gap-2">
                    <span>Energy:</span>
                    <input
                        type="number"
                        className="border w-14 rounded bg-gray-100 px-1 text-center"
                        value={session.energy}
                        readOnly
                    />
                </div>

                <div className="flex gap-2 items-center">
                    <span>Status:</span>
                    <input
                        type="text"
                        value={session.status}
                        readOnly
                        className={`border w-28 h-8 rounded bg-gray-100 px-1 font-bold ${session.status === "PENDING"
                                ? "text-yellow-600"
                                : session.status === "PROCESSING"
                                    ? "text-yellow-600"
                                    : session.status === "COMPLETED"
                                        ? "text-green-600"
                                        : session.status === "FAILED"
                                            ? "text-red-700"
                                            : session.status === "ABORTED"
                                                ? "text-gray-600"
                                                : "text-black"
                            }`}
                    />
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex gap-2 justify-between items-center py-1">
                <div className="flex gap-2">
                    <label>Cycle Count:</label>
                    <input
                        type="number"
                        className="w-14 border rounded bg-gray-100 text-center"
                        value={session.cycle_number}
                        readOnly
                    />
                </div>

                <div className="flex gap-1">
                    <span>End Time:</span>
                    <input
                        type="text"
                        value={
                            session.end_time
                                ? new Date(session.end_time).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })
                                : "--"
                        }
                        readOnly
                        className="border w-20 rounded bg-gray-100 px-1 text-center"
                    />
                </div>

                {/* 🔥 Abort Button */}
                <button
                    disabled={!isOn}
                    className={`px-3 py-1 rounded ${isOn
                            ? "bg-red-400 cursor-pointer"
                            : "bg-gray-300 cursor-not-allowed"
                        }`}
                    onClick={() => onAbort(session.id)}
                >
                    Abort
                </button>
            </div>
        </div>
    );
}