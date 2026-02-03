import React from 'react'
import PondMap from "../../components/ponds/PondMap";


const MapTab = () => {
  return (
    <div className="h-[calc(100vh-140px)]">
      <PondMap fullView />
    </div>
  );
};

export default MapTab