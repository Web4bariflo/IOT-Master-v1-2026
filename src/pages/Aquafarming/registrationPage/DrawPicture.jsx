import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import Layout from "./Layout";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useParams } from "react-router-dom";
import axios from "axios";
// import './DrawData.css'
import mqtt from "mqtt";
import transformer from "../../../assets/Images/transformer.png";
import cutouter from "../../../assets/Images/electric-panel.png";
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_IP

const DrawMap = ({
  id,
  color,
  weight,
  drawnItemsRef,
  customMarker,
  lineStringCounter,
  setLineStringCounter,
  setDrawnFeatures,
  drawnFeatures,
  pondData,
  lineColors,
  uniqueMarkers,
}) => {
  const map = useMap();
  const pondLayerRef = useRef(null);
  const polygonRef = useRef(null);
  const isFetched = useRef(false); // Ref to track if features are fetched
  const [drawndata, SetDrawndata] = useState(null);
  const drawnItems = new L.FeatureGroup();
  const pondLayer = new L.FeatureGroup();
  const BASEURL =process.env.REACT_APP_IP;

  console.log("id is :", id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASEURL}/drawline/`, {
          params: { id },
        });
        SetDrawndata(response.data.data || []);
        console.log("Markers have been added to the map.");
      } catch (error) {
        console.error("Error fetching stored markers:", error);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    const fetchStoredMarkers = async () => {
      // Replace with your base URL function
      drawndata?.forEach((feature) => {
        if (feature.geometry.type === "Point") {
          const { coordinates } = feature.geometry;
          const { type } = feature.properties;
          addCustomMarker(
            coordinates[1],
            coordinates[0],
            type,
            drawnItemsRef.current
          ); // Add marker using type
        }
      });
    };
    fetchStoredMarkers();
  }, [drawndata, id]);

  useEffect(() => {
    const fetchStoredLinesAndPolygons = async () => {
      drawndata?.forEach((feature) => {
        if (feature.geometry.type !== "Point") {
          const layer = L.geoJSON(feature).getLayers()[0];
          if (layer.setStyle) {
            const lineType = feature.properties.type;
            const color = lineColors[lineType] || "#000000"; // Use black if no color found
            layer.setStyle({
              color: color,
              weight: weight, // Adjust the weight as needed
            });
            drawnItemsRef.current.addLayer(layer);
          }
        }
      });
    };
    fetchStoredLinesAndPolygons();
  }, [id, weight, lineColors, drawndata]);

  useEffect(() => {
    map.addLayer(drawnItems);
    map.addLayer(pondLayer);

    drawnItemsRef.current = drawnItems;
    pondLayerRef.current = pondLayer;

    const drawControl = new L.Control.Draw({
      edit: {
        featureGroup: drawnItems,
        remove: true,
      },
      draw: {
        marker: false,
      },
    });

    map.addControl(drawControl);

    const handleCreate = (event) => {
      const layer = event.layer;
      const lineType = `line${lineStringCounter + 1}`;
      layer.setStyle({
        color: "black",
        weight: weight,
      });
      drawnItems.addLayer(layer);
      const drawnData = layer.toGeoJSON();
      if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
        const lineStringType = `line${lineStringCounter + 1}`;
        drawnData.properties.type = lineStringType;
        setLineStringCounter(lineStringCounter + 1);
      }
      setDrawnFeatures((prevFeatures) => [...prevFeatures, drawnData]);
      console.log("Created Feature:", drawnData);
    };

    const handleEdit = (event) => {
      const layers = event.layers;
      const updatedFeatures = [];
      layers.eachLayer((layer) => {
        const updatedData = layer.toGeoJSON();
        if (layer.setStyle) {
          updatedData.properties.type =
            layer.feature?.properties?.type || "line";
          layer.setStyle({
            color: getLineColor(updatedData.properties.type),
            weight: weight,
          });
        }
        updatedFeatures.push(updatedData);
      });
      setDrawnFeatures((prevFeatures) => {
        const newFeatures = prevFeatures.map((feature) => {
          const updatedFeature = updatedFeatures.find(
            (uf) =>
              uf.geometry.type === feature.geometry.type &&
              ((uf.geometry.type === "Point" &&
                uf.geometry.coordinates[0] ===
                  feature.geometry.coordinates[0] &&
                uf.geometry.coordinates[1] ===
                  feature.geometry.coordinates[1]) ||
                (uf.geometry.type === "LineString" &&
                  JSON.stringify(uf.geometry.coordinates) ===
                    JSON.stringify(feature.geometry.coordinates)) ||
                uf.properties.type === feature.properties.type)
          );
          return updatedFeature || feature;
        });
        const newUniqueFeatures = updatedFeatures.filter(
          (uf) =>
            !prevFeatures.some(
              (feature) =>
                uf.geometry.type === feature.geometry.type &&
                ((uf.geometry.type === "Point" &&
                  uf.geometry.coordinates[0] ===
                    feature.geometry.coordinates[0] &&
                  uf.geometry.coordinates[1] ===
                    feature.geometry.coordinates[1]) ||
                  (uf.geometry.type === "LineString" &&
                    JSON.stringify(uf.geometry.coordinates) ===
                      JSON.stringify(feature.geometry.coordinates)) ||
                  uf.properties.type === feature.properties.type)
            )
        );
        return [...newFeatures, ...newUniqueFeatures];
      });
      console.log("Updated Features:", updatedFeatures);
    };

    map.on(L.Draw.Event.CREATED, handleCreate);
    map.on(L.Draw.Event.EDITED, handleEdit);

    return () => {
      map.off(L.Draw.Event.CREATED, handleCreate);
      map.off(L.Draw.Event.EDITED, handleEdit);
      map.removeControl(drawControl);
    };
  }, [
    map,
    color,
    weight,
    drawnItemsRef,
    lineStringCounter,
    setDrawnFeatures,
    pondData,

    id, // Add id to dependencies so that the effect runs if id changes
  ]);
  useEffect(() => {
    const pondLayer = pondLayerRef.current;

    pondLayer.clearLayers();

    const createHexagonalPolygon = (coordinates) => {
      return L.polygon(coordinates, { color: "#009FBD" });
    };

    pondData.forEach((pond) => {
      const polygon = createHexagonalPolygon(pond.pond_location[0]);
      pondLayer.addLayer(polygon);
    });
  }, [pondData]);


  useEffect(() => {
    if (customMarker) {
      addCustomMarker(
        customMarker.lat,
        customMarker.lng,
        customMarker.type,
        drawnItemsRef.current
      );
    }
  }, [customMarker]);

  const addCustomMarker = (lat, lng, type, drawnItemsGroup) => {
    try {
      // Track marker counts by type
      const markerTypeCounts = uniqueMarkers.current;

      // Check if the marker already exists in the drawnItemsGroup
      const existingMarker = Array.from(drawnItemsGroup.getLayers()).find(
        (layer) => {
          if (layer instanceof L.Marker) {
            const latLng = layer.getLatLng();
            return latLng.lat === lat && latLng.lng === lng;
          }
          return false;
        }
      );
      if (existingMarker) {
        console.log("Marker already exists at this location.");
        return; // Don't add the marker if it already exists
      }

      // Increment the count for this marker type
      const markerCount = markerTypeCounts[type] || 0;
      markerTypeCounts[type] = markerCount + 1;

      // Create a name for the marker based on its type and count
      const markerName = `${type}${markerTypeCounts[type]}`;

      // Proceed to add the new marker
      const iconHtml = getIconHtmlByType(type);
      const icon = L.divIcon({
        className: "custom-div-icon",
        html: iconHtml,
        iconSize: [24, 24],
        iconAnchor: [12, 24],
      });
      const marker = L.marker([lat, lng], { icon, draggable: true }).addTo(map);
      drawnItemsGroup.addLayer(marker);

      // Add marker data to drawn features
      const markerData = marker.toGeoJSON();
      markerData.properties.type = markerName; // Assign the marker name
      setDrawnFeatures((prevFeatures) => [...prevFeatures, markerData]);

      //console.log("Added Marker Data:", markerData);

      // Update marker data on drag end
      marker.on("dragend", () => {
        const updatedData = marker.toGeoJSON();
        updatedData.properties.type = markerName;
        setDrawnFeatures((prevFeatures) => {
          const newFeatures = prevFeatures.map((feature) =>
            feature === markerData ? updatedData : feature
          );
          return newFeatures;
        });
        console.log("Updated Marker Data:", updatedData);
      });
    } catch (error) {
      console.error("Error adding custom marker:", error);
    }
  };

  const getIconHtmlByType = (type) => {
    const baseType = type.replace(/[0-9]/g, "");

    switch (baseType) {
      case "powerhouse":
        return `<img src=${transformer} alt="transformer" style="width: 4.4rem; height: 4.4rem;" />`;
      case "starter":
        return `<img src=${cutouter} alt="starter" style="width: 4rem; height: 4rem;" />`;
      case "areator":
        return `<i class="bi bi-hdd-network" style="font-size: 1rem;"></i>`;
      case "checktray":
        return `<i class="bi bi-camera" style="font-size: 1rem;"></i>`;
      default:
        return null;
    }
  };

  const getLineColor = (type) => {
    switch (type) {
      case "boundary":
        return "#FF0000"; // Red for boundaries
      case "road":
        return "#0000FF"; // Blue for roads
      default:
        return "#000000"; // Black as a fallback
    }
  };

  return null;
};

const SetMapCenter = ({ center }) => {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.setView(center);
    }
  }, [center, map]);

  return null;
};
const DrawData = ({id}) => {
  const [color, setColor] = useState("#3388ff");
  const [weight, setWeight] = useState(5);
  const [mapType, setMapType] = useState("white");
  const [customMarker, setCustomMarker] = useState(null);
  const [lineStringCounter, setLineStringCounter] = useState(0);
  const drawnItemsRef = useRef(null);
  const [drawnFeatures, setDrawnFeatures] = useState([]);
  const [pondData, setPondData] = useState([]);
  const [center, setCenter] = useState([21.559, 87.065]);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);
  const [zoom, setZoom] =  useState(18)
  // const {clusterId} = useRegistrationContext();



  const uniqueMarkers = useRef(new Set());
  const navigate = useNavigate();
  const [lineColors, setLineColors] = useState({}); // Store line colors
  const [markerCounters, setMarkerCounters] = useState({});
  const [deleteTrigger, setDeleteTrigger] = useState(0); // Track deletions

  // const id= clusterId;
  console.log("drawdataid:",id)
  useEffect(() => {
    const fetchPondData = async () => {
      const BASEURL = process.env.REACT_APP_IP;
      try {
        const response = await axios.get(`${BASEURL}/send_location/${id}/`);
        setPondData(response.data);
        console.log(response.data);

        if (response.data.length > 0) {
          const firstHexagonCoordinates = response.data[0].pond_location[0];
          const latCenter =
            firstHexagonCoordinates.reduce((sum, coord) => sum + coord[0], 0) /
            firstHexagonCoordinates.length;
          const lngCenter =
            firstHexagonCoordinates.reduce((sum, coord) => sum + coord[1], 0) /
            firstHexagonCoordinates.length;
          setCenter([latCenter, lngCenter]);
          console.log("updated");
        }
      } catch (error) {
        console.error("Error fetching pond data:", error);
      }
    };

    fetchPondData();
  }, [id]);

  useEffect(() => {
    const mqttClient = mqtt.connect({
      hostname: "newmqtt.bc-pl.com",
      port: 443,
      protocol: "wss",
      path: "/mqtt",
      username: "Vertoxlabs",
      password: "Vertoxlabs@2024",
    });

    mqttClient.on("connect", () => {
      console.log("Connected to MQTT broker");
      mqttClient.subscribe("456/data");
    });

    mqttClient.on("message", (topic, payload) => {
      const data = JSON.parse(payload.toString());
      console.log(data);
      console.log(lineColors);

      setLineColors((prevColors) => ({
        ...prevColors,
        [`${data.line}`]: data?.current == 0 ? "red" : "green",
      }));
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setZoom(window.innerWidth < 768 ? 10 : 18); // Adjust zoom based on screen size
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const saveDrawings = () => {
    const BASEURL = process.env.REACT_APP_IP;

    const sendDataToServer = async () => {
      try {
        console.log("Saving data:", drawnFeatures);
        const response = await axios.post(`${BASEURL}/drawline/`, {
          data: drawnFeatures,
          id: id,
        });
        if (response.status == "201") {
          alert("Data Saved Successfully");
          // navigate("/adminside/cluster-for-picture");
        }
        console.log(response.data);
      } catch (error) {
        console.error("Error sending data to the server:", error);
      }
    };

    sendDataToServer();
  };

  const toggleMapType = () => {
    setMapType((prevMapType) =>
      prevMapType === "white"
        ? "satellite"
        : prevMapType === "satellite"
        ? "osm"
        : "white"
    );
  };

  const handleAddMarker = (type) => {
    try {
      setCustomMarker({ lat: center[0], lng: center[1], type });
    } catch (error) {
      console.error("Error setting custom marker:", error);
    }
  };

  const handleDeleteClick = () => {
    setShowModal(true); // Show confirmation modal
  };
  
  const handleConfirmDelete = async () => {
    const BASEURL = process.env.REACT_APP_IP;
  
    try {
      const response = await axios.delete(`${BASEURL}/delete_drawline/${id}/`);
  
      if (response.status === 200 || response.status === 204) {
        console.log("Draw data deleted successfully");
  
        // Clear all drawn features from the map
        drawnItemsRef.current.clearLayers();
  
        // Reset all relevant states
        setDrawnFeatures([]);
        uniqueMarkers.current = new Set();
        setMarkerCounters({});
        setLineStringCounter(0);
  
        // Increment deleteTrigger to trigger a refresh
  
        alert("Data deleted successfully");
        navigate("/adminside/cluster-for-picture");
      } else {
        console.warn("Unexpected response status:", response.status);
        alert("Unexpected response from the server.");
      }
    } catch (error) {
      console.error("Error deleting cluster:", error.response || error);
      alert("Error deleting data. Please try again later.");
    } finally {
      setShowModal(false);
    }
  };

 
  const handleCancelDelete = () => {
    setShowModal(false); 
  };

  const tileLayerUrl =
    mapType === "osm"
      ? "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      : mapType === "satellite"
      ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
      : "";

  console.log(center);

  return (
    <>
      <Layout>
        <div >
          <div className="tools">
            <div className="button-group flex p-2 gap-3">
              <button
              type="button"
                className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{ border: "1px solid black", borderRadius: "10px" }}
                onClick={saveDrawings}
              >
                Save
              </button>
              <button
                type="button"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{ border: "1px solid black", borderRadius: "10px" }}
                onClick={toggleMapType}
              >
                {mapType === "white"
                  ? "Satellite"
                  : mapType === "satellite"
                  ? "OpenStreetMap"
                  : "White Mode"}
              </button>
              <button
                type="button"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{ border: "1px solid black", borderRadius: "10px" }}
                onClick={() => handleAddMarker("powerhouse")}
              >
                <b>Powerhouse </b>
              </button>
              <button
                type="button"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{ border: "1px solid black", borderRadius: "10px" }}
                onClick={() => handleAddMarker("starter")}
              >
                <b>Starter</b>
              </button>
              <button
                type="button"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{ border: "1px solid black", borderRadius: "10px" }}
                onClick={() => handleAddMarker("areator")}
              >
                <b>Aerator </b>
              </button>
              <button
                type="button"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{ border: "1px solid black", borderRadius: "10px" }}
                onClick={() => handleAddMarker("checktray")}
              >
                <b>Checktray</b>
              </button>
              <button
                type="button"
                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                style={{ border: "1px solid black", borderRadius: "10px" }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteClick();
                }}
              >
                <b>Delete</b>
              </button>
            </div>
          </div>
         

          <MapContainer
            center={center}
            zoom={18}
            maxZoom={18}
            style={{ height: "65vh", width: "100%", zIndex: 0 }}
            className="mt-20 md:mt-0"
          >
            {mapType !== "white" && (
              <TileLayer
                url={tileLayerUrl}
                maxZoom={20}
                attribution={
                  mapType === "osm"
                    ? '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    : '&copy; <a href="https://www.arcgis.com/">ArcGIS</a> contributors'
                }
              />
            )}
            <SetMapCenter center={center} />
            <DrawMap
              id={id}
              color={color}
              weight={weight}
              drawnItemsRef={drawnItemsRef}
              customMarker={customMarker}
              lineStringCounter={lineStringCounter}
              setLineStringCounter={setLineStringCounter}
              setDrawnFeatures={setDrawnFeatures}
              drawnFeatures={drawnFeatures}
              pondData={pondData}
              lineColors={lineColors}
              uniqueMarkers={uniqueMarkers}
              markerCounters={markerCounters} // Pass markerCounters
              setMarkerCounters={setMarkerCounters} // Pass setMarkerCounters
            />
            {mapType === "white" && <div className="white-map-overlay"></div>}
          </MapContainer>
        </div>
      </Layout>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 50, // Higher z-index to overlay above map
          }}
        >
          <div
            style={{
              backgroundColor: "white",
              padding: "24px",
              borderRadius: "8px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
            ref={modalRef}
          >
            <h5
              style={{
                fontSize: "1.25rem",
                fontWeight: "600",
                marginBottom: "16px",
              }}
            >
              Confirm Deletion
            </h5>
            <p>Are you sure you want to delete this draw cluster?</p>
            <div
              style={{
                marginTop: "16px",
                display: "flex",
                justifyContent: "flex-end",
                gap: "16px",
              }}
            >
              <button
                style={{
                  backgroundColor: "#f56565",
                  color: "white",
                  padding: "8px 16px",
                  borderRadius: "8px",
                }}
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                style={{
                  backgroundColor: "#e2e8f0",
                  padding: "8px 16px",
                  borderRadius: "8px",
                }}
                onClick={handleCancelDelete}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DrawData;
