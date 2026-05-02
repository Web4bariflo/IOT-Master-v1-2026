// import React from 'react'
// import { POND_TABS } from '../constants/PondTabs'

// const tabs = [
//   { key: POND_TABS.FEEDING, label: "Feeding" },
//   { key: POND_TABS.MAP, label: "Map" },
//   { key: POND_TABS.FARM, label: "Farm" },
// ];

// const PondTabs = ({ activeTab, onChange }) => {
//   return (
//     <div className="flex gap-2 border-b mb-3">
//       {tabs.map((tab) => (
//         <button
//           key={tab.key}
//           onClick={() => onChange(tab.key)}
//           className={`px-4 py-2 text-sm font-medium rounded-t
//             ${
//               activeTab === tab.key
//                 ? "bg-white border border-b-0 text-blue-600"
//                 : "text-gray-500 hover:text-blue-600"
//             }`}
//         >
//           {tab.label}
//         </button>
//       ))}
//     </div>
//   );
// }

// export default PondTabs


import React from 'react'
import { POND_TABS } from '../constants/PondTabs'

const tabs = [
  { key: POND_TABS.FEEDING, label: "Feeding" },
  { key: POND_TABS.MAP, label: "Map" },
  { key: POND_TABS.FARM, label: "Farm" },
  {key:POND_TABS.POWER_MON, label: "Power Mon"}
];

const PondTabs = ({ activeTab, onChange }) => {
  return (
    <div className="flex gap-2 border-b mb-3">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`px-4 py-2 text-sm font-medium rounded-t
            ${
              activeTab === tab.key
                ? "bg-white border border-b-0 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}

export default PondTabs