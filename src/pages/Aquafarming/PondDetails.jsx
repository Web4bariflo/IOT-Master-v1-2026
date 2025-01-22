import React, { useState, useEffect } from "react";

import { MapContainer, TileLayer, LayersControl, Polygon } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import axios from "axios";

import { useParams } from "react-router-dom";

import * as turf from "@turf/turf";

import PondGraph from "./PondGraph";

const PondDetails = () => {
  const { id } = useParams();

  const [polygons, setPolygons] = useState([]);

  const [bounds, setBounds] = useState(null); // No default value here

  const [totalArea, setTotalArea] = useState(0);

  const [weatherData, setWeatherData] = useState(null);

  const [loadingWeather, setLoadingWeather] = useState(true);

  const BASEURL = process.env.REACT_APP_IP;

  const WEATHER_API_KEY = "f06c28466bd98b962ed2e94b9fd29598";

  useEffect(() => {
    const fetchMapData = async () => {
      try {
        const response = await axios.get(`${BASEURL}/userpondsid/${id}/`);

        console.log("Map Data Response:", response.data); // Debug API Response

        if (response.data && response.data.location) {
          const locations = response.data.location;

          const city = response.data.address || "Unknown";

          if (locations.length > 0) {
            // Extract the polygon coordinates

            const polygonCoordinates = locations[0].map((coord) => [
              coord[0],
              coord[1],
            ]); // Already in [lat, lng] format

            // Set polygons

            setPolygons([polygonCoordinates]);

            // Calculate bounds

            const latitudes = polygonCoordinates.map((coord) => coord[0]);

            const longitudes = polygonCoordinates.map((coord) => coord[1]);

            setBounds([
              [Math.min(...latitudes), Math.min(...longitudes)],

              [Math.max(...latitudes), Math.max(...longitudes)],
            ]);

            // Calculate total area using Turf.js

            const geoPolygon = turf.polygon([polygonCoordinates]);

            setTotalArea(turf.area(geoPolygon));

            // Fetch Weather Data

            fetchWeatherData(city);
          } else {
            console.warn("No valid polygon coordinates found.");
          }
        } else {
          console.warn("Empty or invalid map data response.");
        }
      } catch (error) {
        console.error("Error fetching map data:", error);
      }
    };

    const fetchWeatherData = async (cityName) => {
      try {
        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${WEATHER_API_KEY}`
        );

        const uniqueForecastDays = [];

        const sixDaysData = response.data.list.filter((day) => {
          const date = new Date(day.dt_txt).getDate();

          if (!uniqueForecastDays.includes(date)) {
            uniqueForecastDays.push(date);

            return true;
          }

          return false;
        });

        setWeatherData(sixDaysData);

        setLoadingWeather(false);
      } catch (error) {
        console.error("Error fetching weather data:", error);

        setLoadingWeather(false);
      }
    };

    fetchMapData();
  }, [id]);

  return (
    <div className="p-4 w-full">
      {/* Title Section */}

      <div className="flex items-center w-full max-w-7xl px-2 mt-16">
        <div className="bg-white px-6 py-3 text-base font-semibold shadow-md rounded-lg ml-4">
          Pond Details
        </div>

        <div className="flex-grow border-t border-gray-800 mx-2"></div>

        <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
      </div>

      <div className="flex flex-wrap gap-5 items-start mt-5 ml-5">
        {/* Map Section */}

        <div className="h-[400px] w-full xl:w-3/5 relative rounded-lg overflow-hidden shadow-lg">
          {bounds ? (
            <MapContainer
              bounds={bounds}
              style={{ height: "100%", width: "100%" }}
              zoom={10}
            >
              <LayersControl position="topright">
                <LayersControl.BaseLayer name="Default View">
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="&copy; OpenStreetMap contributors"
                  />
                </LayersControl.BaseLayer>

                <LayersControl.BaseLayer checked name="Satellite View">
                  <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    attribution="© Esri"
                  />
                </LayersControl.BaseLayer>
              </LayersControl>

              {polygons.map((polygon, index) => (
                <Polygon
                  key={index}
                  positions={polygon}
                  pathOptions={{
                    color: "red",

                    weight: 2,

                    opacity: 1,

                    fill: false,
                  }}
                />
              ))}
            </MapContainer>
          ) : (
            <p>Loading map data...</p> // Fallback UI while waiting for bounds
          )}

          {/* Total Area Display */}

          <div
            style={{
              zIndex: "1000",

              position: "absolute",

              bottom: "20px",

              color: "white",

              fontWeight: "bold",

              fontSize: "1rem",

              left: "10px",
            }}
          >
            Total Area: {(totalArea / 4046.86).toFixed(2)} acres
          </div>
        </div>

        {/* Weather Section */}

        <div className="w-96 h-[400px] xl:w-[38%] bg-gradient-to-r from-blue-600 to-blue-300 p-5 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-white mb-5">Weather</h3>

          {loadingWeather ? (
            <p className="text-white">Loading weather data...</p>
          ) : weatherData && weatherData.length > 0 ? (
            <div>
              {/* Today's Weather */}

              <div className="flex items-center mb-5">
                <img
                  src={`https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png`}
                  alt="Weather Icon"
                  className="w-28"
                />

                <div className="ml-3 text-black">
                  <p>
                    <strong>Today</strong> |{" "}
                    {weatherData[0].dt_txt.split(" ")[0]}
                  </p>

                  <p>
                    {(weatherData[0].main.temp - 273.15).toFixed(2)} °C -{" "}
                    {weatherData[0].weather[0].description}
                  </p>
                </div>
              </div>

              {/* Next 6 Days Weather */}

              <h1 className="text-xl p-2 ">6 days weather</h1>

              <div className="flex justify-between">
                {weatherData.slice(1, 6).map((day, index) => (
                  <div key={index} className="text-center text-black">
                    <img
                      src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                      alt="Weather Icon"
                      className="w-12"
                    />

                    <p>
                      {(day.main.temp_min - 273.15).toFixed(2)}° -{" "}
                      {(day.main.temp_max - 273.15).toFixed(2)}°
                    </p>

                    <p className="font-bold">{day.dt_txt.split(" ")[0]}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-white">No weather data available.</p>
          )}
        </div>
      </div>

      <PondGraph />
    </div>
  );
};

export default PondDetails;
