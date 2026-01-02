import React, { useState } from "react";
import { BiSolidEdit } from "react-icons/bi";
import { MdOutlineLocationOn } from "react-icons/md";
import PondLocation from "./PondLocation";
import { BsPlusCircleFill } from "react-icons/bs";
import DrawPicture from "./DrawPicture";
import { useRegistrationContext } from "../context/RegistrationContext";


const AddDevice = ({onSuccess}) => {
  const [pondList, setPondList] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedPond, setSelectedPond] = useState("");
  const [numberOfPonds, setNumberOfPonds] = useState("");
  const [successfulPonds, setSuccessfulPonds] = useState([]);
  const [pondData, setPondData] = useState({});
  const [pondName, setPondName] = useState("");
  const [showDrawPicture, setShowDrawPicture] = useState(false);
  const [locationsAdded, setLocationsAdded] = useState({});
  const {clusterId} = useRegistrationContext();


  const fieldData = {
    Aeration: { label: "Aeration" },
    "Feeding": { label: " Feeding" },
    "Feed Tray": { label: "Feed Tray", icon: "feed_tray_icon.png" },

    // "Lora Gateway": { label: "Lora Gateway", icon: "" },
    // Monitoring: { label: "Monitoring" },
    // "Power Circuit": { label: "Power Circuit" },
  };

  const handleLocationClick = (pond) => {
    setPondName(pond);
    const pondDetails = pondData[pond] || {};
    setSelectedPond(pondDetails);
    setIsPopupVisible(true);
  };

  const closePopup = (pondAdded) => {
    setIsPopupVisible(false);
    setSelectedPond("");
    if (pondAdded && !successfulPonds.includes(pondAdded)) {
      setSuccessfulPonds((prev) => [...prev, pondAdded]);
      setLocationsAdded((prev) => ({
        ...prev,
        [pondAdded]: true, // Mark the location as added for this pond
      }));
    }
  };

  const addPonds = (e) => {
    e.preventDefault();
    const count = parseInt(numberOfPonds);
    if (count > 0) {
      const newPonds = Array.from(
        { length: count },
        (_, index) => `Pond ${index + 1}`
      );
      setPondList(newPonds);
      // setNumberOfPonds("");
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
    setShowDrawPicture(true);
  };

  const handleSubmit = () => {
    console.log("pond data submitted!");
    alert("Drawdata submitted successfully")
    onSuccess();
  };

  // Check if all ponds have location added and ponds exist
  const allPondsHaveLocations = pondList.every(
    (pond) => locationsAdded[pond] === true
  );

  // Disable the draw button until ponds are added and all locations are added
  const isDrawButtonDisabled = pondList.length === 0 || !allPondsHaveLocations;

  return (
    <React.Fragment>
      <div className="flex mt-10 h-full">
        <p className=" text-xl">Add No. of Ponds: </p>
        <input
          type="number"
          value={numberOfPonds}
          onChange={(e) => setNumberOfPonds(e.target.value)}
          className="border rounded-md p-1 ml-2 text"
        />
        <button type="button" onClick={addPonds} className="text-blue-700 ml-2">
          <BsPlusCircleFill />
        </button>
      </div>

      <h3 className="mt-8 text-xl font-bold">Add Device : </h3>
      <div className="mt-8 border mr-20 bg-[#F6F9FD]">
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
                          value={pondData[pond]?.[field] || ""}
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
              type="button"
              className={`flex border rounded-md items-center py-1 px-2 ${
                isDrawButtonDisabled ? "bg-[#C8D8F8]" : "bg-[#A6C8F7]"
              }`}
              onClick={handleDrawClick}
              disabled={isDrawButtonDisabled} // Disable the button until ponds and locations are ready
            >
              <BiSolidEdit className="text-xl" /> Draw
            </button>
            {showDrawPicture && (
              <div>
                <DrawPicture id={clusterId}/>
                {/* Submit button below DrawPicture */}
                <div className="flex justify-center mt-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-blue-500 text-white rounded-md py-2 px-6"
                  >
                    Add
                  </button>
                </div>
              </div>
            )}
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
