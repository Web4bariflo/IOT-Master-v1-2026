import AutoFeederStatusPanel from "../feeders/AutoFeederStatusPanel";
import AlertsPanel from "../alerts/AlertsPanel";

const RightPanel = () => {
  return (
    <div className="w-80 border-l p-3 space-y-4">
      <AutoFeederStatusPanel />
      <AlertsPanel />
    </div>
  );
};

export default RightPanel;
