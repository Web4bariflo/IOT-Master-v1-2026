import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const ManagerSidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedClusterId, setSelectedClusterId] = useState(null);

  const URL = process.env.REACT_APP_IP;
  const auth = { token: localStorage.getItem("auth") };
  const tokenObject = JSON.parse(auth.token);
  // console.log(tokenObject.Mob)
  const mob = tokenObject.Mob;
  const name = tokenObject.name;

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleClusterClick = (clusterId) => {
    setSelectedClusterId(clusterId);
  };

  const fetchClusters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/admin_cluster_view/${mob}/`);
      // console.log("cluster response",response.data);
      setClusters(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to fetch cluster data. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClusters();
  }, []);

return (
  <div className="relative z-[1000]">
    {/* Hamburger Menu (Mobile) */}
    <button
      className="md:hidden p-4 fixed top-4 left-4 z-[1100] bg-white rounded-lg shadow-md"
      onClick={toggleSidebar}
    >
      <i className={`bi ${sidebarOpen ? "bi-x" : "bi-list"} text-2xl text-gray-700`} />
    </button>

    {/* Sidebar */}
    <aside
      className={`fixed top-0 left-0 h-full z-[1050]
      w-[260px] md:w-[280px]
      bg-white
      shadow-lg
      transition-transform duration-300 ease-in-out
      ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }
      md:relative md:translate-x-0`}
    >
      {/* Header / User Info */}
      <div className="px-6 py-6">
        <button
          className="w-full flex items-center justify-between"
          onClick={toggleDropdown}
        >
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 flex items-center justify-center rounded-full bg-sky-100">
              <i className="bi bi-diagram-3-fill text-sky-600 text-lg"></i>
            </div>
            <span className="font-semibold text-gray-800 text-sm truncate">
              {name}
            </span>
          </div>
          <i
            className={`bi ${
              dropdownOpen ? "bi-chevron-up" : "bi-chevron-down"
            } text-gray-500`}
          />
        </button>
      </div>

      {/* Cluster List */}
      <div className="px-4 space-y-1">
        {loading ? (
          <p className="text-gray-400 text-sm px-2">Loading clusters...</p>
        ) : error ? (
          <p className="text-red-500 text-sm px-2">Error loading clusters</p>
        ) : (
          dropdownOpen &&
          clusters.map((cluster) => (
            <div key={cluster.id}>
              <Link to={`/manager/clusterview/${cluster.id}`}>
                <div
                  className={`px-4 py-2 rounded-lg text-sm cursor-pointer
                  transition-all duration-200
                  ${
                    selectedClusterId === cluster.id
                      ? "bg-sky-100 text-sky-700 font-medium"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                  onClick={() => handleClusterClick(cluster.id)}
                >
                  {cluster.Name}
                </div>
              </Link>

              {/* {selectedClusterId === cluster.id && (
                <button
                  className="ml-6 mt-1 px-4 py-1.5 text-xs rounded-md
                  bg-sky-500 text-white hover:bg-sky-600 transition"
                  onClick={() =>
                    navigate(`/manager/economy/${cluster.id}`)
                  }
                >
                  Pond Economy
                </button>
              )} */}
            </div>
          ))
        )}
      </div>
    </aside>

    {/* Mobile Overlay */}
    {sidebarOpen && (
      <div
        className="fixed inset-0 bg-black/40 z-[1040] md:hidden"
        onClick={toggleSidebar}
      />
    )}
  </div>
);

};

export default ManagerSidebar;
