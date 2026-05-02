import { useEffect, useState } from "react";
import PowerCard from "./PowerCard";
import { getSessions, abortSession } from "../../hooks/usePowerMonitoringData";
import useDashboardData from "../../hooks/useDashboardData"; // 👈 ADD THIS

export default function PowerGrid() {
  const [sessions, setSessions] = useState([]);

  // ✅ Get active pond
  const pondId = Number(localStorage.getItem("activePond"));

  // ✅ Get devices like Feeder
  const { devices, loading } = useDashboardData(pondId, "Power Monitoring");

  // 🔄 Fetch sessions ONLY if device exists
  useEffect(() => {
    if (!devices || devices.length === 0) {
      setSessions([]); // 👈 no device → no cards
      return;
    }

    const fetchData = async () => {
      try {
        const deviceId = devices[0].device_id; // 👈 dynamic device

        const data = await getSessions(deviceId);

        console.log("API:", data);

        setSessions(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setSessions([]);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 3000);

    return () => clearInterval(interval);
  }, [devices]);

  // 🔥 Abort handler
  const handleAbort = async (sessionId) => {
    try {
      await abortSession(sessionId);
    } catch (error) {
      console.error("Abort failed", error);
    }
  };

  // ⏳ Loading
  if (loading) {
    return <div className="p-4 text-sm text-gray-500">Loading Power Monitoring...</div>;
  }

  // ❌ No device → show nothing (same as Feeder behavior)
  if (!devices || devices.length === 0) {
    return null;
  }

  // return (
  //   <div className="grid grid-cols-2 mt-4 border shadow-md gap-2 px-6 py-6 rounded">
  //     {sessions.map((session) => (
  //       <div key={session.id}>
  //         <PowerCard 
  //           session={session} 
  //           onAbort={handleAbort}
  //         />
  //       </div>
  //     ))}
  //   </div>
  // );

  return (
  <div className="grid grid-cols-2 gap-4 p-0">
    {sessions.map((session) => (
      <div key={session.id}>
        <PowerCard session={session} />
      </div>
    ))}
  </div>
);
}