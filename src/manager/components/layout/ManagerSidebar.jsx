import React, { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManagerSidebar = ({ setDevices, setActivePond, activePond, pondId }) => {
  const [ponds, setPonds] = useState([]);
  const [search, setSearch] = useState("");
  const [showFilterPonds, setShowFilterPonds] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const BASEURL = process.env.REACT_APP_IP;

  /* ===== FETCH PONDS ===== */
  useEffect(() => {
    const fetchPonds = async () => {
      try {
        const response = await axios.get(`${BASEURL}/userponds/15/`);
        // API returns { ponds: [...] }
        const unsortedPonds = response.data.ponds || [];
        const sortedPonds = unsortedPonds.sort((a, b) =>
          a.name.localeCompare(b.name, undefined, {
            numeric: true,
            sensitivity: "base",
          }),
        );
        setPonds(sortedPonds);
      } catch (error) {
        console.error("Failed to fetch ponds", error);
      }
    };
    fetchPonds();
  }, [BASEURL]);

  //  const {
  //   setDevices
  // } = useFeedingData(pondId);

  /* ===== API CALL ===== */
  const fetchDevices = async (pondId) => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${BASEURL}/deviceid_view/${pondId}/`, {
        params: { device_type: "Feeding" },
      });
      setDevices(data.devices || []);
      console.log("Fetched Devices:", data.devices);
    } catch (error) {
      console.error("Failed to fetch devices", error);
    } finally {
      setLoading(false);
    }
  };

  /* ===== FILTER ===== */
  const filteredPonds = ponds.filter((pond) =>
    pond.name.toLowerCase().includes(search.toLowerCase()),
  );

  /* ===== HANDLER ===== */
  const handlePondClick = (pondId) => {
    setActivePond(pondId);

    if (pondId) {
      fetchDevices(pondId);
    } else {
      setDevices([]); // Clear IDs but keep UI
    }
  };

  return (
    <aside className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
      {/* ===== SEARCH ===== */}
      <div className="p-4 border-b">
        <div className="relative">
          <i className="bi bi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Search pond"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* ===== POND LIST ===== */}
      <nav className="flex-1 px-2 py-3 overflow-y-auto">
        {filteredPonds.map((pond) => (
          <button
            key={pond.id}
            onClick={() => handlePondClick(pond.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 mb-1 rounded-md text-sm font-medium transition
              ${
                activePond === pond.id
                  ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                  : "text-gray-700 hover:bg-gray-50"
              }
            `}
          >
            <i className="bi bi-water text-base" />
            <span>{pond.name}</span>
          </button>
        ))}

        {/* ===== FILTER TOGGLE ===== */}
        <button
          onClick={() => setShowFilterPonds(!showFilterPonds)}
          className="w-full flex items-center gap-3 px-3 py-2.5 mt-3 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <i className="bi bi-funnel" />
          Filters
          <i
            className={`bi bi-chevron-${showFilterPonds ? "up" : "down"} ml-auto text-xs`}
          />
        </button>

        <button
          className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          onClick={() => {
            console.log("Generate clicked", activePond);

            if (!activePond) {
              alert("Please select a pond first");
              return;
            }

            const pond = ponds.find((p) => p.id === activePond);

            navigate(`/manager/pond-module/${activePond}`, {
              state: { pondName: pond?.name },
            });
          }}
        >
          Generate
        </button>
      </nav>
    </aside>
  );
};

export default ManagerSidebar;
