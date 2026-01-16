import React, { useEffect, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

 
const ponds = [
  { id: 1, name: "Pond P1" },
  { id: 2, name: "Pond P2" },
  { id: 3, name: "Pond P3" },
  { id: 4, name: "Pond P4" },
];

// const ManagerSidebar = () => {
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [clusters, setClusters] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [selectedClusterId, setSelectedClusterId] = useState(null);

//   const URL = process.env.REACT_APP_IP;
//   const auth = { token: localStorage.getItem("auth") };
//   const tokenObject = JSON.parse(auth.token);
//   // console.log(tokenObject.Mob)
//   const mob = tokenObject.Mob;
//   const name = tokenObject.name;

//   const navigate = useNavigate();

//   const toggleDropdown = () => {
//     setDropdownOpen(!dropdownOpen);
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   const handleClusterClick = (clusterId) => {
//     setSelectedClusterId(clusterId);
//   };

//   const fetchClusters = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(`${URL}/admin_cluster_view/${mob}/`);
//       // console.log("cluster response",response.data);
//       setClusters(response.data);
//       setLoading(false);
//     } catch (error) {
//       console.error(error);
//       setError("Failed to fetch cluster data. Please try again later.");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchClusters();
//   }, []);

// return (
//   <div className="relative z-[1000]">
//     {/* Hamburger Menu (Mobile) */}
//     <button
//       className="md:hidden p-4 fixed top-4 left-4 z-[1100] bg-white rounded-lg shadow-md"
//       onClick={toggleSidebar}
//     >
//       <i className={`bi ${sidebarOpen ? "bi-x" : "bi-list"} text-2xl text-gray-700`} />
//     </button>

//     {/* Sidebar */}
//     <aside
//       className={`fixed top-0 left-0 h-full z-[1050]
//       w-[260px] md:w-[280px]
//       bg-white
//       shadow-lg
//       transition-transform duration-300 ease-in-out
//       ${
//         sidebarOpen ? "translate-x-0" : "-translate-x-full"
//       }
//       md:relative md:translate-x-0`}
//     >
//       {/* Header / User Info */}
//       <div className="px-6 py-6">
//         <button
//           className="w-full flex items-center justify-between"
//           onClick={toggleDropdown}
//         >
//           <div className="flex items-center gap-3">
//             <div className="w-9 h-9 flex items-center justify-center rounded-full bg-sky-100">
//               <i className="bi bi-diagram-3-fill text-sky-600 text-lg"></i>
//             </div>
//             <span className="font-semibold text-gray-800 text-sm truncate">
//               {name}
//             </span>
//           </div>
//           <i
//             className={`bi ${
//               dropdownOpen ? "bi-chevron-up" : "bi-chevron-down"
//             } text-gray-500`}
//           />
//         </button>
//       </div>

//       {/* Cluster List */}
//       <div className="px-4 space-y-1">
//         {loading ? (
//           <p className="text-gray-400 text-sm px-2">Loading clusters...</p>
//         ) : error ? (
//           <p className="text-red-500 text-sm px-2">Error loading clusters</p>
//         ) : (
//           dropdownOpen &&
//           clusters.map((cluster) => (
//             <div key={cluster.id}>
//               <Link to={`/manager/clusterview/${cluster.id}`}>
//                 <div
//                   className={`px-4 py-2 rounded-lg text-sm cursor-pointer
//                   transition-all duration-200
//                   ${
//                     selectedClusterId === cluster.id
//                       ? "bg-sky-100 text-sky-700 font-medium"
//                       : "hover:bg-gray-100 text-gray-700"
//                   }`}
//                   onClick={() => handleClusterClick(cluster.id)}
//                 >
//                   {cluster.Name}
//                 </div>
//               </Link>

//               {/* {selectedClusterId === cluster.id && (
//                 <button
//                   className="ml-6 mt-1 px-4 py-1.5 text-xs rounded-md
//                   bg-sky-500 text-white hover:bg-sky-600 transition"
//                   onClick={() =>
//                     navigate(`/manager/economy/${cluster.id}`)
//                   }
//                 >
//                   Pond Economy
//                 </button>
//               )} */}
//             </div>
//           ))
//         )}
//       </div>
//     </aside>

//     {/* Mobile Overlay */}
//     {sidebarOpen && (
//       <div
//         className="fixed inset-0 bg-black/40 z-[1040] md:hidden"
//         onClick={toggleSidebar}
//       />
//     )}
//   </div>
// );

// };

const ManagerSidebar = () => {
  const [activePond, setActivePond] = useState(1);
  const [search, setSearch] = useState("");
  const [showFilterPonds, setShowFilterPonds] = useState(false); // toggle for filter ponds
 
  const filteredPonds = ponds.filter((pond) =>
    pond.name.toLowerCase().includes(search.toLowerCase())
  );


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
            onClick={() => setActivePond(pond.id)}
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

        {/* ===== FILTERED PONDS (Nested) ===== */}
        {showFilterPonds &&
          ponds.map((pond) => (
            <button
              key={`filter-${pond.id}`}
              onClick={() => setActivePond(pond.id)}
              className={`w-full flex items-center gap-3 ml-5 px-3 py-2 text-sm rounded-md transition
                ${
                  activePond === pond.id
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600"
                    : "text-gray-600 hover:bg-gray-50"
                }
              `}
            >
              <i className="bi bi-droplet-half text-sm" />
              {pond.name}
            </button>
          ))}
      </nav>
    </aside>
  );
};

export default ManagerSidebar;
