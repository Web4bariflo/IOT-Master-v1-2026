import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import Mapimg from "../assets/img/cluster.png";
import axios from "axios";
import URL from "../URL";
import { Link } from "react-router-dom";

const Cluster = () => {
  const api = URL;
  //   const navigate = useNavigate();
  const [clusters, setClusters] = useState([]);

  // Fetch cluster and user data
  const fetchClusters = async () => {
    try {
      const response = await axios.get(`${api}/admin_cluster_view/129125/`);
      console.log(response.data);
      setClusters(response.data); // Assuming response.data is an array of clusters
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
              <Link to={`/pond/${clusters.cluster_id}`}>
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
    </div>
  );
};

export default Cluster;
