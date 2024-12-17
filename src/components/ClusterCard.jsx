import React, { useState } from "react";
import { useRegistrationContext } from "./../context/RegistrationContext"; // Import context
import axios from "axios"; // Import axios for API calls

const AddCluster = ({ clusters, setClusters, onClusterCreated }) => {
  const { mob, setCoustmerId,setClusterId } = useRegistrationContext(); // Access mob from context
  const [clusterName, setClusterName] = useState("");
  const [loading, setLoading] = useState(false); // To manage loading state
  const [error, setError] = useState(""); // To manage error messages
  const [success, setSuccess] = useState(""); // To manage success messages
  const URL = process.env.REACT_APP_IP; // Get base URL from environment variable

  

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
      console.log(response.data.message.customer_id);


      setCoustmerId(response.data.message.customer_id)
      setClusterId(response.data.message.cluster_id)
      
      // Add the new cluster to the list of clusters
      setClusters((prevClusters) => [...prevClusters, response.data]);

      setSuccess("Cluster added successfully!");
      onClusterCreated();
    } catch (error) {
      setError("There was an error creating the cluster. Please try again.");
      console.error("Error during API call:", error);
    } finally {
      setLoading(false);
    }
  };

  // Render the list of clusters as cards
  const renderClusterCards = () => {
    return clusters.map((cluster) => (
      <div
        // key={cluster.id} // Keep the key here for the outer div
        className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
      >       
        <div
          className="p-2 bg-white max-h-max shadow-lg max-w-max rounded-md cursor-pointer"
        >
          <img 
            src='https://t3.ftcdn.net/jpg/01/67/00/92/360_F_167009209_xLKrZkX6IToY9iau3zmb7F6U756p6S5t.jpg' 
            alt="Cluster Image" 
            className="w-[200px]" 
          />
          <div className="flex w-full justify-between px-2">
            <p className="text-lg text-orange-900 font-semibold mt-4">
              {clusterName} {/* Displaying cluster name here */}
            </p>
          </div>
        </div>
      </div>
    ));
  };
  

  return (
    <div>
      {error && (
        <div className="bg-red-200 text-red-800 p-3 rounded mb-4">{error}</div>
      )}

      {/* Cluster creation input */}
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
          disabled={loading} // Disable button while loading
        >
          {loading ? "Adding..." : "+"}
        </button>
      </div>

      {/* Render clusters as cards */}
      <div className="flex flex-wrap gap-4">{renderClusterCards()}</div>
    </div>
  );
};

export default AddCluster;
