import FeederCard from "./FeederCard";
import useFeedingData from "../../hooks/useFeedingData";
import useFeederDashboardData from "../../hooks/useFeederDashboardData";


const FeederGrid = ({ applyAll }) => {
  const pondId = Number(localStorage.getItem("activePond"));

  const { devices, deviceTasksMap, loading } =
    useFeederDashboardData(pondId);

  if (loading) {
    return <div className="p-4 text-sm text-gray-500">Loading feeders...</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {devices.map((device) => (
        <FeederCard
          key={device.device_id}
          feeder={device}
          tasks={deviceTasksMap[device.device_id] || []}
          applyAll={applyAll}
        />
      ))}
    </div>
  );
};

export default FeederGrid;
