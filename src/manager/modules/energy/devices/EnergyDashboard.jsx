import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Power from "../../../../assets/Images/PowerMon.png";
import PondMap from "../../../../manager/components/ponds/PondMap.jsx";
import PondMap2 from "../../../../manager/components/ponds/PondMap2.jsx";
import WeatherCard from "./WeatherCard";
import { useEffect, useState } from "react";
import {
    generateCycles,
    createSession,
    deleteSchedule,
    getCycleData,
    getWorkers,
    abortSession,
    getDeviceId
}
    from "../../../hooks/usePowerMonitoringData.js";

export default function EnergyDashboard() {

    const [startTime, setStartTime] = useState(""); // stores selected start time for a cycle input
    const [endTime, setEndTime] = useState(""); // stores selected end time for a cycle input
    const [cycle, setCycle] = useState("1"); // stores number of cycles selected from dropdown
    const [device, setDevice] = useState(""); // stores selected device ID
    const [showTable, setShowTable] = useState(false); // controls whether cycle table is visible or not
    const [generatedCycle, setGeneratedCycle] = useState("0"); // stores generated cycle count (from API or UI)
    const [cyclesData, setCyclesData] = useState([]); // stores generated cycle list from API
    const [loading, setLoading] = useState(false); // handles loading state (API call in progress)
    const [timeData, setTimeData] = useState({}); // stores start & end time for each cycle (key = cycle_number)
    const [fetchData, setFetchData] = useState([]); // stores session data (status, energy, session_id, etc.)
    const [workers, setWorkers] = useState([]); // stores worker list for dropdown assignment
    const [selectedWorker, setSelectedWorker] = useState({}); // stores selected worker for each cycle (key = cycle_number)
    const [generatedDevice, setGeneratedDevice] = useState(""); // stores device ID used when cycles are generated (locks device after generate)

    const [devices, setDevices] = useState([]);

    const cycleCount = Number(generatedCycle);


    // ✅ DEVICE FETCH FUNCTION ADDED

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const data = await getDeviceId("5");
                console.log("DEVICES:", data);

                setDevices(
                    Array.isArray(data)
                        ? data
                        : data.devices || data.Device || []
                );
            } catch (error) {
                console.error("Device Fetch Error:", error);
                setDevices([]);
            }
        };

        fetchDevices();
    }, []);



    // this function formats time for backend API ✅
    const formatDateTime = (value) => {
        const date = new Date(value);

        // 🔥 add buffer (important)
        date.setSeconds(date.getSeconds());

        const pad = (n) => String(n).padStart(2, "0");

        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
    };

    // ✅ generate all cycle function
    const handleGenerate = async () => {
        try {
            setLoading(true);

            const payload = {
                device_id: device,
                cycle_count: Number(cycle),
            };

            const data = await generateCycles(payload);

            console.log("API RESPONSE:", data);

            if (data.success) {
                setCyclesData(data.cycles);
                setShowTable(true);
                setGeneratedDevice(device);

                // ✅ SUCCESS TOAST
                // toast.success("Cycle generated successfully");

                toast.success(
                    <span className="text-black font-semibold">
                        Cycle generated successfully
                    </span>);

            } else {
                // ❌ API returned false
                toast.error("Clear all cycles first");
            }

        } catch (error) {
            console.error("Error:", error);

            // ❌ API ERROR (like 400, 500)
            if (error?.message?.includes("clear") || error?.response?.data?.message?.includes("clear")) {
                toast.error("Clear all cycles first");
            }
            else {

                toast.error(
                    <span className="text-black font-semibold">
                        Failed to generate cycle
                    </span>);
            }

        } finally {
            setLoading(false);
        }
    };


    // ✅ add session data function

    // const handleSubmit = async (item) => {
    //     try {
    //         const selected = timeData[item.cycle_number];
    //         const worker = selectedWorker[item.cycle_number];

    //         if (!worker) {
    //             toast.error("Please select a worker");
    //             return;
    //         }

    //         if (!selected || !selected.start || !selected.end) {
    //             toast.error("Select start & end time");
    //             return;
    //         }

    //         const now = new Date();
    //         const start = new Date(selected.start);

    //         const diff = (start - now) / 1000;

    //         if (diff < 60) {
    //             toast.error("Start time must be at least 60 seconds ahead");
    //             return;
    //         }

    //         const payload = {
    //             device_id: device,
    //             cycles: [
    //                 {
    //                     start_time: formatDateTime(selected.start),
    //                     end_time: formatDateTime(selected.end),
    //                     main: 1,
    //                     worker_id: Number(worker), // ✅ IMPORTANT
    //                 },
    //             ],
    //         };
    //         const res = await createSession(payload);

    //         toast.success(`Cycle ${item.cycle_number} scheduled successfully`);

    //         console.log("SESSION RESPONSE:", res);

    //         handleGetCycleData(device);

    //     } catch (error) {
    //         console.error("Submit Error:", error);
    //         toast.error("Failed to create schedule");
    //     }
    // };

    const handleSubmitAll = async () => {
        try {
            // ❌ Validation
            if (!device) {
                toast.error("Please select device");
                return;
            }

            if (!cyclesData.length) {
                toast.error("No cycles to submit");
                return;
            }

            // ✅ Build cycles array
            const cycles = cyclesData.map((item) => {
                const selected = timeData[item.cycle_number];
                const worker = selectedWorker[item.cycle_number];

                if (!selected || !selected.start || !selected.end) {
                    throw new Error(`Missing time for cycle ${item.cycle_number}`);
                }

                if (!worker) {
                    throw new Error(`Worker not selected for cycle ${item.cycle_number}`);
                }

                return {
                    start_time: formatDateTime(selected.start),
                    end_time: formatDateTime(selected.end),
                    main: 1,
                    worker_id: Number(worker), // keep number if backend expects number
                };
            });

            // ✅ Final payload
            const payload = {
                device_id: device,
                cycles: cycles,
            };

            console.log("SUBMIT ALL PAYLOAD:", payload);

            // ✅ API CALL
            const res = await createSession(payload);

            console.log("SUBMIT ALL RESPONSE:", res);

            toast.success("All cycles submitted successfully");

            // 🔄 Refresh data
            handleGetCycleData(device);

        } catch (error) {
            console.error("Submit All Error:", error);

            toast.error(
                error.message || "Failed to submit all cycles"
            );
        }
    };


    // ✅ this is showing for clear cycle pop message
    const showClearConfirm = () => {
        toast.info(
            ({ closeToast }) => (
                <div className="text-center">
                    <b className="font-medium text-black mb-3">
                        Are you sure to clear all cycles?
                    </b>

                    <div className="flex justify-center gap-9 mt-4">
                        {/* Cancel */}
                        <button
                            className="bg-gray-400 text-white px-3 py-1 rounded"
                            onClick={closeToast}
                        >
                            Cancel
                        </button>

                        {/* Confirm */}
                        <button
                            className="bg-red-600 text-white px-3 py-1 rounded"
                            onClick={() => {
                                closeToast();
                                handleClear(); // ✅ call actual clear
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            ),
            {
                position: "top-center",
                autoClose: false, // ❗ important (so user can click)
                closeOnClick: false,
                closeButton: false,
            }
        );
    };


    // ✅ Clear ALL Cycle function
    const handleClear = async () => {
        try {
            const payload = { device_id: device };

            const res = await deleteSchedule(payload);

            console.log("CLEAR RESPONSE:", res);

            setCyclesData([]);
            setShowTable(false);
            setTimeData({});

            // toast.success("All cycles cleared");

            toast.success(
                <span className="text-black font-semibold">
                    All cycles cleared
                </span>);

        } catch (error) {
            console.error("Clear Error:", error);
            toast.error("Failed to clear cycles");
        }
    };


    // ✅ FETCH ALL CYCLE FUNCTION
    const handleGetCycleData = async (device) => {
        try {
            const response = await getCycleData(device);
            console.log("GET DATA:", response);

            setFetchData(response);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (!device) return;

        const interval = setInterval(() => {
            handleGetCycleData(device);
        }, 1000);

        return () => clearInterval(interval);
    }, [device]);



    // ✅ WORKER FETCH FUNCTION ADDED
    const fetchWorkers = async () => {
        try {
            const data = await getWorkers("9327939342");
            console.log("WORKERS:", data);

            // ✅ FIX HERE
            setWorkers(data.Employee || []);

        } catch (error) {
            console.error("Worker Fetch Error:", error);
            setWorkers([]);
        }
    };

    // ✅ CALL WORKER API
    useEffect(() => {
        fetchWorkers();
    }, []);



    // ✅ clear session function
    const handleAbort = async (item) => {
        try {
            const session = fetchData.find(
                d => d.cycle_number === item.cycle_number
            );

            const payload = {
                session_id: session.id || session.session_id,
            };

            console.log("ABORT PAYLOAD:", payload);

            const res = await abortSession(payload);

            console.log("ABORT RESPONSE:", res);

            // ✅ SUCCESS TOAST

            toast.success(
                <span className="text-black font-semibold">
                    Cycle {item.cycle_number} aborted successfully
                </span>);

            // refresh data
            handleGetCycleData(device);

        } catch (error) {
            console.error("Abort Error:", error.response || error);

            // ❌ ERROR TOAST
            toast.error(
                <span>Failed to abort cycle</span>
            );
        }
    };


    useEffect(() => {
        if (cycle === "0") {
            setStartTime("");
            setEndTime("");
        }
    }, [cycle]);

    return (
        <div className=" min-h-screen flex ml-70">

            {/* this show popup message on the top*/}

            <ToastContainer position="top-center" autoClose={1000} />

            <div className="flex-1 p-6">

                <div className="flex gap-4">
                    <div className="flex-1 bg-white rounded-lg shadow overflow-hidden">

                        {/* this is show pond map */}
                        <PondMap2 />
                    </div>

                    {/* this show weather card */}
                    <WeatherCard />
                </div>

                <div className="mt-6 border-1 rounded-lg shadow p-4">

                    <div className="flex justify-between items-center">
                        <div className="flex items-center gap-6 mb-4 mt-2 flex-wrap">
                            <span className="font-semibold">POND1</span>

                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">Device Id</label>

                                {/* // ✅ DYNAMIC DEVICE SHOW */}
                                <select
                                    className="border rounded px-3 py-1 text-sm"
                                    value={device}
                                    onChange={(e) => setDevice(e.target.value)}
                                >
                                    <option value="">Select Device</option>

                                    {devices.map((dev, i) => (
                                        <option key={i} value={dev.device_id || dev.id}>
                                            {dev.device_id || dev.id}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex items-center gap-2">
                                <label className="text-sm text-gray-600">Monitoring Cycle</label>
                                <select
                                    className="border rounded px-3 py-1 text-sm w-16"
                                    value={cycle}
                                    onChange={(e) => setCycle(e.target.value)}
                                >
                                    <option value="0">0</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </select>
                            </div>

                            {/* ✅ HANDLE THE GENERATE BUTTON*/}

                            <button
                                className="bg-blue-500 text-white px-4 py-1 font-medium rounded text-sm"
                                onClick={handleGenerate}
                            >
                                Generate
                            </button>

                            {/* ✅ HANDLE THE handleClear button*/}

                            <button
                                className="bg-red-500 text-white px-4 py-1 font-medium rounded text-sm"
                                onClick={showClearConfirm}
                            >
                                Clear
                            </button>
                        </div>
                        <button
                            className="bg-green-600 text-white px-4 py-1 font-medium rounded text-sm"
                            onClick={handleSubmitAll}
                        >
                            Submit All
                        </button>
                    </div>

                    <div className="rounded overflow-hidden flex gap-4 items-start">


                        {/* ✅ Show the powermonitering image*/}

                        <div className="flex flex-col items-center">
                            <img
                                src={Power}
                                alt="device"
                                className="w-[70px] h-[70px] object-contain border rounded"
                            />
                            <p className="font-semibold text-xs">PowerMON</p>
                        </div>

                        <table className="w-full text-sm">
                            <thead className="bg-gray-100 text-gray-600">
                                <tr>
                                    <th className="p-2 border">Device ID</th>
                                    <th className="p-2 border">Cycle No.</th>
                                    <th className="p-2 border">Start Time</th>
                                    <th className="p-2 border">End Time</th>
                                    <th className="p-1 border">Power Consumption(kwh)</th>
                                    <th className="p-2 border">PF</th>
                                    <th className="p-2 border">Worker Assign</th>
                                    <th className="p-2 border">Action</th>
                                    <th className="p-2 border">Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {/* ✅ this is show when Cycle is not generate*/}

                                {!showTable ? (
                                    <tr>
                                        <td colSpan="9" className="text-center p-6 text-gray-500">
                                            No Cycle Started
                                        </td>
                                    </tr>
                                ) : cyclesData.length === 0 ? (
                                    <tr>
                                        <td colSpan="9" className="text-center p-6 text-gray-500">
                                            No Cycle started
                                        </td>

                                        {/* ✅ this is for give start time and end time */}

                                    </tr>
                                ) : (
                                    cyclesData.map((item, index) => (
                                        <tr key={index} className="text-center">
                                            <td className="border p-2">{generatedDevice}</td>
                                            <td className="border p-2">{item.cycle_number}</td>

                                            {/* ✅ this is for give start time and end time */}

                                            <td className="border p-2">
                                                <input
                                                    type="datetime-local"
                                                    value={timeData[item.cycle_number]?.start || ""}
                                                    onChange={(e) =>
                                                        setTimeData({
                                                            ...timeData,
                                                            [item.cycle_number]: {
                                                                ...timeData[item.cycle_number],
                                                                start: e.target.value,
                                                            },
                                                        })
                                                    }
                                                />
                                            </td>

                                            <td className="border p-2">
                                                <input
                                                    type="datetime-local"
                                                    value={timeData[item.cycle_number]?.end || ""}
                                                    onChange={(e) =>
                                                        setTimeData({
                                                            ...timeData,
                                                            [item.cycle_number]: {
                                                                ...timeData[item.cycle_number],
                                                                end: e.target.value,
                                                            },
                                                        })
                                                    }
                                                />
                                            </td>

                                            {/* ✅ this is show power consumtion */}

                                            <td className="border p-2">
                                                {
                                                    fetchData.find(d => d.cycle_number === item.cycle_number)?.energy || "-"
                                                }
                                            </td>

                                            <td className="border p-2">
                                                <span>0</span>
                                            </td>

                                            {/* ✅ DYNAMIC WORKER DROPDOWN */}

                                            <td className="border p-2">
                                                <select
                                                    className="border rounded px-3 py-1 text-[13px]"
                                                    value={selectedWorker[item.cycle_number] || ""}
                                                    onChange={(e) =>
                                                        setSelectedWorker({
                                                            ...selectedWorker,
                                                            [item.cycle_number]: e.target.value,
                                                        })
                                                    }
                                                >
                                                    <option value="">Select Worker</option>

                                                    {workers.map((worker, i) => (
                                                        <option key={i} value={worker.worker_id}> {/* ✅ FIX */}
                                                            {worker.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>

                                            <td className="border p-2">
                                                {(() => {
                                                    const status = fetchData
                                                        .find(d => d.cycle_number === item.cycle_number)
                                                        ?.status?.toUpperCase();

                                                    // ✅ ONLY show Abort when PROCESSING
                                                    if (status === "PROCESSING") {
                                                        return (
                                                            <button
                                                                className="bg-red-600 text-[13px] font-semibold text-white px-2 py-1 rounded-md"
                                                                onClick={() => handleAbort(item)}
                                                            >
                                                                Abort
                                                            </button>
                                                        );
                                                    }

                                                    // ✅ otherwise show nothing
                                                    return null;
                                                })()}
                                            </td>

                                            {/* ✅ SHOW DYNAMIC STATUS */}

                                            <td className="border p-2 text-[14px] font-medium">
                                                {(() => {
                                                    const status = fetchData.find(d => d.cycle_number === item.cycle_number)?.status || "PENDING";

                                                    let colorClass = "text-gray-500";

                                                    if (status === "PENDING") colorClass = "text-yellow-600";
                                                    else if (status === "PROCESSING") colorClass = "text-orange-600";
                                                    else if (status === "COMPLETED") colorClass = "text-green-600";
                                                    else if (status === "FAILED") colorClass = "text-red-700";
                                                    else if (status === "ABORTED") colorClass = "text-red-700";

                                                    return <span className={colorClass}>{status}</span>;
                                                })()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </div>
    );
}