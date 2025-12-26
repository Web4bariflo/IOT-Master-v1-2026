import { useState, useEffect } from "react";
import axios from "axios";
import FeedingModule from "../modules/feeding/FeedingModule";
import EnergyModule from "../modules/energy/EnergyModule";
 
// const ponds = ["POND1", "POND2", "POND3", "POND4"];
 
 
const ShowDeviceDetails = ({ clusterid }) => {
  const [activeModule, setActiveModule] = useState("feeding");
  const [activePond, setActivePond] = useState("POND1");
  const [pondList, setpondList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
//  console.log("ShowDeviceDetails clusterid:", clusterid);
  const fetchPonds = async () => {
    const BASEURL = process.env.REACT_APP_IP;
 
    try {
      setLoading(true);
      const response = await axios.get(`${BASEURL}/clusterpond_analytic/${clusterid}/`);
      console.log(response)
      setpondList(response.data.pond);
      setLoading(false);
    } catch (error) {
      // console.error(error);
      setError("Failed to fetch cluster data. Please try again later.");
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchPonds();
  }, [clusterid]);
 
  return (
    <div className="flex w-full bg-white rounded-lg shadow-sm">
      {/* LEFT SIDE BAR */}
      <div className="w-56 border-r p-4">
        <button
          className={`w-full mb-3 p-3 rounded text-left ${activeModule === "feeding"
              ? "bg-blue-600 text-white"
              : "bg-gray-100"
            }`}
          onClick={() => setActiveModule("feeding")}
        >
          Feeding Module
        </button>
 
        <button
          className={`w-full p-3 rounded text-left ${activeModule === "energy" ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
          onClick={() => setActiveModule("energy")}
        >
          Energy Module
        </button>
      </div>
 
      {/* RIGHT SIDE CONTENT */}
      <div className="flex-1 p-4">
        {/* POND TABS */}
        <div className="flex border border-gray-200 mb-4 bg-gray-50">
          {pondList.map((pond) => {
            const isActive = activePond === pond.name;
 
            return (
              <button
                key={pond.id}
                onClick={() => setActivePond(pond.name)}
                className={`
        px-4 py-1.5
        text-sm
        transition-all duration-200
        ${isActive
                    ? `
              bg-white font-medium
              border border-gray-200 border-b-0
              relative z-10
              -mb-px pb-2
            `
                    : `
              border-r border-gray-200
              text-gray-500
              hover:bg-gray-200 hover:text-gray-700
            `
                  }
      `}
              >
                {pond.name}
              </button>
            );
          })}
 
        </div>
 
        {/* MODULE RENDERING */}
        {activeModule === "feeding" && <FeedingModule pondId={activePond} />}
 
        {activeModule === "energy" && <EnergyModule pondId={activePond} />}
      </div>
    </div>
  );
};
 
export default ShowDeviceDetails;
 
 