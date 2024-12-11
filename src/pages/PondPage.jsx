import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import PondImage from "../assets/img/pond_image.png"; 
import axios from "axios";
import URL from "../URL";
const PondPage = () => {
  const api = URL;
  // const navigate = useNavigate();
  const [ponds, setPonds] = useState([]);

  // Fetch pond data
  const fetchPonds = async () => {
    try {
      const response = await axios.get(`${api}/adminpond_view/1/`); 
      console.log(response.data);
      setPonds(response.data); 
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPonds();
  }, []);

  return (
    <div className="w-full h-screen">
      {/* Title Section */}
      <div className="flex items-center w-full max-w-7xl px-2 mt-20">
        <div className="bg-white px-6 py-3 text-base font-semibold shadow-md rounded-lg ml-4">
          Ponds
        </div>
        <div className="flex-grow border-t border-gray-800 mx-2"></div>
        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
      </div>

      {/* Pond Cards Section */}
      <div className="w-full mt-8 flex gap-3 flex-wrap justify-center sm:justify-start">
        {ponds.length > 0 ? (
          ponds.map((pond, index) => (
            <div
              key={index}
              className="w-60 p-4 bg-white rounded-lg shadow-md mt-4 ml-6"
            >
              <img
                src={PondImage}
                alt="Pond"
                className="w-[200px] rounded-xl"
              />
              <p className="text-sm text-blue-900 font-semibold mt-4">
                {pond.name}
              </p>
            </div>



          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            No Pond available
          </p>
        )}
      </div>
    </div>
  );
};

export default PondPage;
