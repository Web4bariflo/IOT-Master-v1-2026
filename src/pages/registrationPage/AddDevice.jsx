import React, { useEffect, useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import PondLocation from "./PondLocation";
import { BsPlusCircleFill } from "react-icons/bs";
import DrawPicture from "./DrawPicture";

const AddDevice = () => {
  const [pondList, setPondList] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPond, setSelectedPond] = useState("");
  const [numberOfPonds, setNumberOfPonds] = useState("");
  const [successfulPonds, setSuccessfulPonds] = useState([]);
  const [pondData, setPondData] = useState({}); // State to hold input data for ponds
  const [pondName, setPondName] = useState("");
  const [showDrawPicture, setShowDrawPicture] = useState(false); // State to control visibility


  // const fields = [
  //   "Aeration",
  //   "Power Circuit",
  //   "Monitoring",
  //   "Automated Feeder",
  //   "Check Tray",
  //   "Lora Gateway",
  // ];

  const fieldData = {
    Aeration: { label: "Aeration" },
    "Power Circuit": { label: "Power Circuit" },
    Monitoring: { label: "Monitoring" },
    "Automated Feeder": { label: "Automated Feeder" },
    "Check Tray": { label: "Check Tray", icon: "check_tray_icon.png" },
    "Lora Gateway": { label: "Lora Gateway", icon: "" },
  };

  const handleLocationClick = ( pond) => {
    // e.preventDefault()
    console.log("handleLocationClick triggered");

    console.log(pond);
    setPondName(pond);

    const pondDetails = pondData[pond] || {};

    // Set the field data for the selected pond
    setSelectedPond(pondDetails);

    console.log("Selected pond input data:", pondDetails);

    setIsPopupVisible(true);
    console.log("Popup Visibility:", true);

  };

  const closePopup = (pondAdded) => {
    setIsPopupVisible(false);
    setSelectedPond("");
    if (pondAdded && !successfulPonds.includes(pondAdded)) {
      setSuccessfulPonds((prev) => [...prev, pondAdded]);
    }
      console.log("Popup Visibility:", false);

  };

  const addPonds = (e) => {
    console.log('pond addeded')
    e.preventDefault()
    const count = parseInt(numberOfPonds);
    if (count > 0) {
      const newPonds = Array.from(
        { length: count },
        (_, index) => `Pond ${index + 1}`
      );
      setPondList(newPonds);
      setNumberOfPonds("");
      setPondData((prev) => {
        const updatedData = { ...prev };
        newPonds.forEach((pond) => {
          if (!updatedData[pond]) {
            updatedData[pond] = {};
          }
        });
        return updatedData;
      });
    }
  };

  const handleInputChange = (pond, field, value) => {
    setPondData((prev) => ({
      ...prev,
      [pond]: {
        ...prev[pond],
        [field]: value,
      },
    }));
  };
  

  
  const handleDrawClick = () => {
    setShowDrawPicture(true); // Show the DrawPicture component
    console.log("drawdata click")
  };
 
  //   const payload = pondList.map((pond) => ({
  //     pondName: pond,
  //     ...fields.reduce((acc, field) => {
  //       acc[field] = pondData[pond]?.[field] || ""; // Ensure all fields exist
  //       return acc;
  //     }, {}),
  //   }));

  // const handleSubmit = () => {
  //   const payload = pondList.map((pond) => ({
  //     pondName: pond,
  //     ...Object.keys(fieldData).reduce((acc, field) => {
  //       acc[field] = pondData[pond]?.[field] || ""; // Ensure all fields exist
  //       return acc;
  //     }, {}),
  //   }));

  //   console.log("Sending JSON to backend:", payload);

  //   fetch("/api/submit-pond-data", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(payload),
  //   })
  //     .then((response) => {
  //       if (!response.ok) {
  //         throw new Error("Failed to submit data");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log("Backend response:", data);
  //       alert("Data submitted successfully!");
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       alert("Failed to submit data. Please try again.");
  //     });
  // };

  return (
    <React.Fragment>
      <div className="flex mt-10 ml-28">
        <p className=" text-xl">Add No. of Ponds: </p>
        <input
          type="number"
          value={numberOfPonds}
          onChange={(e) => setNumberOfPonds(e.target.value)}
          className="border rounded-md p-1 ml-2 text"
        />
        <button type= 'button' onClick={addPonds} className="text-blue-700 ml-2">
          <BsPlusCircleFill />
        </button>
      </div>

      <h3 className=" ml-28 mt-8 text-xl font-bold">Add Device : </h3>
      <div className="mt-8 ml-28 border mr-20 bg-[#F6F9FD]">
        <div>
          {pondList.length > 0 && (
            <table border="1" className="w-full text-center mt-8">
              <thead>
                <tr>
                  <th>Pond Name</th>
                 

                  {Object.keys(fieldData).map((field, index) => (
                    <th key={index}>
                      <div className="flex flex-col items-center text-sm">
                        <img
                          src={`/path/to/image/${fieldData[field].icon}`}
                          alt={fieldData[field].label}
                          style={{ width: "20px", height: "20px" }}
                        />
                        {fieldData[field].label}
                      </div>
                    </th>
                  ))}
                  <th>Location</th>
                </tr>
              </thead>
              <tbody>
                {pondList.map((pond, index) => (
                  <tr key={index}>
                    <td className="text-center flex justify-center">
                      <div className="flex items-center justify-center w-[101.25px] h-[38px] border rounded-md bg-white">
                        {pond}
                      </div>
                    </td>
                  

                    {Object.keys(fieldData).map((field, fieldIndex) => (
                      <td key={fieldIndex}>
                        <input
                          type="number"
                          name={`${pond}_${field}`}
                          className="border w-[49.59px] h-[29px] rounded-md"
                          onChange={(e) =>
                            handleInputChange(pond, field, e.target.value)
                          }
                          value={pondData[pond]?.[field] || ""} // Ensure default is blank
                        />
                      </td>
                    ))}
                    <td>
                      <div className="flex justify-center mt-4">
                        <button
                        type="button"
                          className={`flex border rounded-md items-center py-1 px-2 ${
                            successfulPonds.includes(pond)
                              ? "bg-green-500"
                              : "bg-[#C8D8F8]"
                          }`}
                          onClick={() => handleLocationClick(pond)}
                        >
                          <MdOutlineLocationOn className="text-xl" />
                          Location
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {pondList.length === 0 && (
            <p className="text-center mt-4">
              No ponds available. Please add ponds.
            </p>
          )}

          <div className="flex-col justify-center my-2">
            <button 
            type='button' 
            className={`flex border rounded-md items-center py-1 px-2 
              ${showDrawPicture ? 'bg-[#A6C8F7]' : 'bg-[#C8D8F8]'}`
            }            onClick={handleDrawClick} >
              <BiSolidEdit className="text-xl" /> Draw
            </button>
            {showDrawPicture && <DrawPicture/>}
          </div>

          {isPopupVisible && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
              <PondLocation
                pond={pondName}
                onClose={closePopup}
                fieldData={selectedPond || {}}
              />
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AddDevice;