import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import PondImage from "../assets/Images/Pond.jpg"; 
import axios from "axios";

const PondPage = () => {
  const {  id } = useParams();
  // console.log("Customer ID:", customer_id);
  console.log("Pond ID:", id); 
  const URL = process.env.REACT_APP_IP;
  
  const [ponds, setPonds] = useState([]);

  // Fetch pond data
  const fetchPonds = async () => {
    try {
      const response = await axios.get(`${URL}/adminpond_view/${id}/`);
      console.log(response);
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
      <Link to={`/ponddetails/${pond.id}`} key={pond.id}> 
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
            </Link>


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