import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManagerSidebar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [clusters, setClusters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const URL = process.env.REACT_APP_IP;
  const auth = { token: localStorage.getItem("auth") };
  const tokenObject = JSON.parse(auth.token);
  console.log(tokenObject);
  const navigate = useNavigate();

  const mob = tokenObject.Mob;
  const name = tokenObject.name;
  const [selectedClusterId, setSelectedClusterId] = useState(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClusterClick = (clusterId) => {
    setSelectedClusterId(clusterId);
  };

  const fetchClusters = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/admin_cluster_view/${mob}/`);
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

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="relative">
      {/* Hamburger Menu for Mobile */}
      <button
        className="md:hidden p-4 absolute top-0 left-0 z-[1000]"
        onClick={toggleSidebar}
      >
        <i className={`bi ${sidebarOpen ? "bi-x" : "bi-list"} text-2xl`}></i>
      </button>

      {/* Sidebar */}
      <aside
        className={`lg:block lg:w-40 h-full bg-white shadow-2xl flex flex-col items-center mt-4 ${
          sidebarOpen ? "fixed w-40 z-[1000]" : "w-0"
        } transition-all duration-300 ease-in-out lg:relative lg:z-auto`}
      >
        {/* Cross Button for Mobile Sidebar */}
        <button
          className="md:hidden absolute top-4 right-4 text-2xl z-[1001] text-black"
          onClick={toggleSidebar}
        >
          <i className="bi bi-x"></i>
        </button>

        <div className="bg-sky-100 w-full rounded-t-lg">
          <button
            className="w-full flex items-center justify-between p-6 rounded-lg bg-sky-100"
            onClick={toggleDropdown}
          >
            <div className="flex items-center">
              <i className="bi bi-diagram-3-fill text-xl mr-2"></i>
              <span className="font-bold text-sm">{name}</span>
            </div>
            <i
              className={`bi ${
                dropdownOpen ? "bi-chevron-up" : "bi-chevron-down"
              }`}
            ></i>
          </button>
        </div>

        <div className="w-full text-center">
          {loading ? (
            <p className="text-gray-500 mt-2">Loading clusters...</p>
          ) : error ? (
            <p className="text-red-500 mt-2">{error}</p>
          ) : (
            dropdownOpen && (
              <div className="mt-2 w-full">
                {clusters.map((cluster) => (
                  <div key={cluster.id}>
                    <Link to={`/manager/clusterview/${cluster.id}`}>
                      <div
                        className={`p-2 hover:bg-sky-200 text-sm cursor-pointer ${
                          selectedClusterId === cluster.id ? "bg-sky-100" : ""
                        }`}
                        onClick={() => handleClusterClick(cluster.id)}
                      >
                        {cluster.Name}
                      </div>
                    </Link>

                    {/* Render Pond Economy button for the selected cluster */}
                    {selectedClusterId === cluster.id && (
                      <button
                        className="text-sm border p-2 mt-1 ml-10 bg-sky-200"
                        onClick={() =>
                          navigate(`/manager/economy/${cluster.id}`)
                        }
                      >
                        Pond Economy
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )
          )}
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-[999] lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default ManagerSidebar;
