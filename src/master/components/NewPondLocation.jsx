import React, { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import L from "leaflet";
import "leaflet-draw";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { TbWorldLongitude, TbWorldLatitude } from "react-icons/tb";
import { useRegistrationContext } from "../context/RegistrationContext";

const NewPondLocation = ({id,pond,onClose,fieldData}) => {
 
  const mapRef = useRef(null);
  const drawnItemsRef = useRef(null);
  const [drawnPolygon, setDrawnPolygon] = useState(null);
  const [cityName, setCityName] = useState("");
  const [coardinates, setCoordinates] = useState([]);

  const [totalArea, setTotalArea] = useState(0);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [map, setMap] = useState(null);

  const [searchName, setSearchName] = useState();
  const BASEURL = process.env.REACT_APP_IP;



  useEffect(() => {
    if (mapRef.current !== null) return;

    const map = L.map("map").setView([20.593683, 78.962883], 18);
    const defaultTileLayer = L.tileLayer(
      "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      {
        attribution: "\u00a9 Esri",
      }
    );

    map.addLayer(defaultTileLayer);
    mapRef.current = map;

    const drawnItems = new L.FeatureGroup();
    map.addLayer(drawnItems);
    drawnItemsRef.current = drawnItems;

    const drawControl = new L.Control.Draw({
      draw: {
        polygon: true,
        polyline: true,
        rectangle: true,
        circle: true,
        marker: true,
      },
      edit: {
        featureGroup: drawnItems,
      },
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.CREATED, function (event) {
      const layer = event.layer;
      drawnItems.addLayer(layer);
      calculateTotalArea();
      saveDrawnPolygon(layer);
    });

    map.on(L.Draw.Event.EDITED, function () {
      calculateTotalArea();
    });

    function calculateTotalArea() {
      let totalAreaSqMeters = 0;
      drawnItems.eachLayer(function (layer) {
        if (layer instanceof L.Polygon) {
          totalAreaSqMeters += L.GeometryUtil.geodesicArea(
            layer.getLatLngs()[0]
          );
        }
      });
      const totalAreaAcres = totalAreaSqMeters / 4046.86;
      setTotalArea(totalAreaAcres);
    }

    function saveDrawnPolygon(layer) {
      const coordinates = layer
        .getLatLngs()[0]
        .map((coord) => [coord.lat, coord.lng]);
      setDrawnPolygon(layer);
      setCoordinates(coordinates);
    }

    setMap(map);

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (latitude && longitude) {
        // Construct device_quantity dynamically using fieldData
        const deviceQuantity = Object.keys(fieldData).reduce((acc, field) => {
          acc[field] = fieldData[field] || 0; // Set default value, modify as needed
          return acc;
        }, {});

        console.log("Sending JSON to backend:", {
          name: pond,
          location: coardinates,
          clusterid: id,
          device_quantity: deviceQuantity, // Ensure this is an object
          area: totalArea,
          latitude: latitude,
          longitude: longitude,
          address:cityName,
        });

        const res = await axios.post(`${BASEURL}/demo/`, {
          name: pond,
          location: coardinates,
          clusterid: id,
          device_quantity: deviceQuantity, // Use dynamic object
          area: totalArea,
          latitude: latitude,
          longitude: longitude,
          address:cityName,
        });
        console.log(res);

        if (res.data && res.data.message) {
          toast.success("Data added successfully!");
          setCoordinates([]);
          setTotalArea(0);
          setLatitude("");
          setLongitude("");
          setTimeout(() => {
            onClose(pond);
          }, 2000);
        } else {
          toast.error("Something went wrong. Please try again.");
        }
      } else {
        toast.error("Latitude and longitude are required.");
      }
    } catch (error) {
      toast.error("Error adding data. Please check your connection.");
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();

    if (map && latitude !== "" && longitude !== "") {
      const latLng = [parseFloat(latitude), parseFloat(longitude)];
      map.setView(latLng, 25);
      L.marker(latLng).addTo(map);
    } else if (searchName !== "") {
      try {
        const response = await axios.get(
          `https://nominatim.openstreetmap.org/search?format=json&q=${searchName}`
        );

        if (response.data[0]) {
          const latLng = [response.data[0].lat, response.data[0].lon];
          map.setView(latLng, 25);
          L.marker(latLng).addTo(map);
        } else {
          toast.error("Location not found.");
        }
      } catch (error) {
        toast.error("Failed to search location.");
      }
    }
    setSearchName("");
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex justify-center items-center bg-[#ffffff] w-[800px] rounded-xl">
        <div className="bg-[#ffffff] shadow-md rounded-lg p-5 w-full">
          <div className="relative flex justify-between items-center mb-4">
            <button
              type="button"
              className="absolute right-[-50px] top-[-18px] bg-red-500 text-white rounded p-2 hover:bg-red-600"
              onClick={onClose}
            >
              ✕
            </button>
            <div className="flex items-center w-full ml-4">
              <span className="flex items-center pr-2">
              </span>
              <input
                type="text"
                placeholder="cityName"
                value={cityName}
                onChange={(e) => setCityName(e.target.value)}
                className="pl-3 border border-gray-300 rounded-xl p-3 w-full focus:ring-blue-500 focus:border-blue-500 h-11"
              />
            </div>

            <div className="flex items-center w-full mr-2 ml-1">
              <span className="flex items-center pr-3">
                <TbWorldLatitude className="w-10 h-10 text-gray-500" />
              </span>
              <input
                type="text"
                placeholder="Latitude"
                className="pl-3 border border-gray-300 p-3 w-full focus:ring-blue-500 focus:border-blue-500 rounded-xl h-11"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>

            <div className="flex items-center w-full ml-4">
              <span className="flex items-center pr-2">
                <TbWorldLongitude className="w-10 h-10 text-gray-500" />
              </span>
              <input
                type="text"
                placeholder="Longitude"
                className="pl-3 border border-gray-300 rounded-xl p-3 w-full focus:ring-blue-500 focus:border-blue-500 h-11"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>

            <div
              className="flex items-center cursor-pointer ml-2"
              onClick={handleSearch}
            >
              <CiSearch className="w-10 h-10 text-blue-600" />
            </div>
          </div>

          <div
            id="map"
            className="w-full h-96 mb-2 border shadow-inner rounded-xl"
          ></div>

          <div className="flex justify-center w-full">
            <button
              type="button"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-8 rounded-md shadow-md"
              onClick={handleSubmit}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <ToastContainer />
    </div>
  );


}

export default NewPondLocation


