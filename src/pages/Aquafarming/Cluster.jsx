import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Mapimg from "../../assets/Images/Cluster.jpg";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import DrawPicture from "./registrationPage/DrawPicture";
import ClusterCreate from "../../components/ClusterCreate";

const Cluster = () => {
  const { mob } = useParams();
  const URL = process.env.REACT_APP_IP;
  const [clusters, setClusters] = useState([]);
  const [showDrawPicture, setShowDrawPicture] = useState(false); 
  const [showClusterPage, setShowClusterPage] = useState(false);// State to control visibility of DrawPicture
  const [selectedOption, setSelectedOption] = useState(""); // State for selected option
  console.log(mob)
  const handleDrawDataClick = () => {
    setShowDrawPicture(true); // Show the DrawPicture component when the button is clicked
  };

  const closeDrawPicture = () => {
    setShowDrawPicture(false); 
    setShowClusterPage(false);
  };

  const AddNewCluster = () => {
    setShowClusterPage(true)
  }

  // Fetch cluster and user data
  const fetchClusters = async () => {
    try {
      const response = await axios.get(
        `${URL}/admin_cluster_view/${mob}/`
      );
      console.log(response)
      setClusters(response.data);
      if (response.data.length > 0) {
        setSelectedOption(response.data[0].id); // Set the initial selected option to the first cluster's ID
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchClusters();
  }, []);

  return (
    <div className="w-full h-screen">
      {/* Title Section */}
      <div className="flex items-center w-full max-w-7xl px-2 mt-20">
        <div className="bg-white px-6 py-3 text-base font-semibold shadow-md rounded-lg ml-4">
          Clusters
        </div>
        <div className="flex-grow border-t border-gray-800 mx-2"></div>
        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
      </div>

      {/* Cluster Cards Section */}

      <div className="w-full mt-8 flex gap-3 flex-wrap justify-center sm:justify-start">
        {clusters.length > 0 ? (
          clusters.map((cluster, index) => (
            <div
              key={index}
              className="w-60 p-4 bg-white rounded-lg shadow-md mt-4 ml-6 "
            >
              <Link to={`/master/pond/${cluster.id}`} key={cluster.id}>
                <img
                  src={Mapimg}
                  alt="Cluster Map"
                  className="w-[200px] rounded-xl"
                />
                <p className="text-sm text-orange-900 font-semibold mt-4">
                  {cluster.Name}
                </p>
              </Link>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No clusters available
          </p>
        )}
      </div>
      <div className="flex items-center space-x-2 p-4 bg-gray-100 rounded-md shadow-md">
        <select
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)} // Update state on selection change
          className="border border-gray-300 rounded-md p-2 text-lg"
        >
          <option value="" disabled>
            Select a cluster
          </option>{" "}
          {/* Placeholder option */}
          {clusters.map((cluster) => (
            <option key={cluster.id} value={cluster.id}>
              {cluster.Name} {/* Display cluster name */}
            </option>
          ))}
        </select>
        <button
          onClick={handleDrawDataClick}
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Draw Data
        </button>
      </div>
      {showDrawPicture && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <DrawPicture id={selectedOption} />
            {/* Close button */}
            <button
              onClick={closeDrawPicture}
              className="mt-4 bg-red-500 text-white p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* new cluster adding button */}
      <button 
      className='fixed bottom-6 right-10 cursor-pointer'
      onClick={AddNewCluster}
      >
        <i class="bi bi-plus-circle-fill text-6xl"></i>
      </button>
      {showClusterPage && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <ClusterCreate mob={mob}/>
            {/* Close button */}
            <button
              onClick={closeDrawPicture}
              className="mt-4 bg-red-500 text-white p-2 rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cluster;
