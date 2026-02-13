import { useState } from "react";
import { useMqtt } from "../../context/MqttContext";
import { MQTT_TOPICS } from "../../mqtt/mqttTopics";
import { scheduleFeeding, abortFeeding } from "../../mqtt/mqttActions";
import PondSection from "../components/ponds/PondSection";
import RightPanel from "../components/common/RightPanel";
import PondTabs from "../components/PondTabs";
import { POND_TABS } from "../constants/PondTabs";
import MapTab from "./tabs/MapTab";
import FarmTab from "./tabs/FarmTab";
import { useMqttt } from "../../context/MqttContext";
import useFeederDashboardData from "../hooks/useFeederDashboardData";



const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(POND_TABS.FEEDING);
  const {subscribeDevices } = useMqtt();
  const { devices, loading } = useFeederDashboardData();



  /* MAP TAB → FULL MAP ONLY */
  if (activeTab === POND_TABS.MAP) {
    return (
      <div className="p-4">
        <PondTabs activeTab={activeTab} onChange={setActiveTab} />
        <MapTab />
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Left Main Area */}
      <div className="flex-1 p-4 overflow-y-auto">
        <PondTabs activeTab={activeTab} onChange={setActiveTab} />
        <PondSection activeTab={activeTab} />
      </div>

      {/* Right Panel */}
      <RightPanel activeTab={activeTab} />
    </div>
  );
};

export default Dashboard;