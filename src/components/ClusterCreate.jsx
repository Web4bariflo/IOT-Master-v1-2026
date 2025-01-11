import axios from "axios"; // Import axios for API calls
import React, { useState } from "react";

const ClusterCreate = ({mob}) => {
  const [loading, setLoading] = useState(false); // To manage loading state
  const [clusterName, setClusterName] = useState(""); // State for cluster name input
  const [error, setError] = useState(""); // To manage error messages
  const URL = process.env.REACT_APP_IP; // Get base URL from environment variable
  const [success, setSuccess] = useState(""); // To manage success messages
  

  console.log(mob);
  const handleAddCluster = async () => {
    if (!clusterName) {
      alert("Cluster name is required!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");


    try {
      const response = await axios.post(`${URL}/cluster_create/`, {
        name: clusterName,
        mob, // We are sending the mob as well from the context
      });
      
      setSuccess("Cluster added successfully!");
      setClusterName("");

      window.location.href = window.location.href;  // Refreshes the entire page
    } catch (error) {
      setError("There was an error creating the cluster. Please try again.");
      console.error("Error during API call:", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div>
      {error && (
        <div className="bg-red-200 text-red-800 p-3 rounded mb-4">{error}</div>
      )}
      <div className="flex items-center mb-2">
        <label htmlFor="cluster" className="font-bold mr-2">
          Add Cluster name:
        </label>
        <input
          type="text"
          id="cluster"
          value={clusterName}
          onChange={(e) => setClusterName(e.target.value)}
          className="border border-gray-300 rounded-md p-2 w-64"
        />
        <button
          type="button"
          onClick={handleAddCluster}
          className="ml-2 bg-blue-500 text-white rounded-md p-2"
        >
          {loading ? "Adding..." : "+"}
        </button>
      </div>
    </div>
  );
};

export default ClusterCreate;
