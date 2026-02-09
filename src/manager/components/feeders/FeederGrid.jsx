import FeederCard from "./FeederCard";
import useFeedingData from "../../hooks/useFeedingData";


const FeederGrid = ({devices, applyAll }) => {
  // const devices = useFeedingData().devices || [];
  console.log("FeederGrid devices:", devices);
 
  return (
    <div className="grid grid-cols-2 gap-4">
      {devices.map((feeder, index) => (
        <FeederCard
          key={index}
          feeder={feeder}
          applyAll={applyAll}
        />
      ))}
    </div>
  );
};

export default FeederGrid;
