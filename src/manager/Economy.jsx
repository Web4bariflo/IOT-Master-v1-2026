import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import RadialBarChart from "./chart/RadialBarChart";
import ColumnChart from "./chart/ColumnChart";
import LineChart from "./chart/LineChart";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Register the components with Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Economy = () => {
  // const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [inputValue, setInputValue] = useState(""); // State for input value
  const [dropdownValue, setDropdownValue] = useState("Daily");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // const BASEURl = process.env.REACT_APP_IP;
  // const auth = { token: localStorage.getItem("auth") };
  // const tokenObject = JSON.parse(auth.token);
  // const mob = tokenObject.Mob;
  // const { id } = useParams();

  // Function to fetch data
  // const fetchData = async () => {
  //   try {
  //     let apiUrl = `${BASEURl}/feedweight_per_date/${mob}/`;
  //     const body = { date: "2024-12-30", pond_id: id };

  //     const response = await axios.post(apiUrl, body);

  //     // console.log("Response data:", response.data);

  //     const data = response.data;

  //     let labels = data.map((item) => {
  //       const date = new Date(item.created_at);
  //       return `${date.getHours()}:${date.getMinutes()}`;
  //     });

  //     const feedingQuantities = data.map((item) => item.feed_weight);

  //     // Update chart data
  //     setChartData({
  //       labels: labels,
  //       datasets: [
  //         {
  //           label: "Feeding Chart",
  //           data: feedingQuantities,
  //           backgroundColor: "rgba(75, 192, 192, 0.2)",
  //           borderColor: "rgba(75, 192, 192, 1)",
  //           borderWidth: 1,
  //         },
  //       ],
  //     });
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []); // This will run once when the component is mounted

  // Chart options
  // const options = {
  //   responsive: true,
  //   scales: {
  //     x: {
  //       title: {
  //         display: true,
  //         text: "Timestamp",
  //       },
  //       ticks: {
  //         autoSkip: false,
  //         maxTicksLimit: 50,
  //       },
  //     },
  //     y: {
  //       title: {
  //         display: true,
  //         text: "Feeding Quantity",
  //       },
  //       beginAtZero: true,
  //     },
  //   },
  // };

  return (
    <div>
      <div className="flex w-full">
        {/* Card 2 Below */}

        <div className="lg:col-span-2 p-4 w-full">
          <div className="bg-white shadow-lg rounded-lg p-6 h-[35rem]">
            <h3 className="text-xl font-semibold mb-4">pond feed chart</h3>
            <div className="flex items-center gap-2">
              <h2 className="mr-4">Feed Weight Comparison</h2>
              <select
                value={dropdownValue}
                onChange={(e) => {
                  setDropdownValue(e.target.value);
                }}
                className="bg-transparent text-lg hover:text-xl"
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
              <SlCalender
                className="text-lg hover:text-xl cursor-pointer"
                onClick={() => setShowCalendar(!showCalendar)}
              />
            </div>
            {showCalendar && (
              <div className="absolute bg-white p-2 shadow-lg rounded z-10">
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => {
                    setSelectedDate(date);
                    setShowCalendar(false);
                  }}
                  inline
                />
              </div>
            )}
            <ColumnChart dropdownValue={dropdownValue} selectedDate={selectedDate}/>
          </div>
        </div>

        {/* Card for Radial Bar Chart (1/3 width) */}
        <div className="lg:col-span-1 p-4  w-1/3">
          <div className="bg-white shadow-lg rounded-lg p-6 h-[100%]">
            <h3 className="text-xl font-semibold mb-4">Cost Chart</h3>

            <div className="mb-4">
              <label
                htmlFor="cost-input"
                className="block text-sm font-medium text-gray-700"
              >
                Enter a value:
              </label>
              <input
                id="cost-input"
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter cost data"
              />
            </div>
            {/* Adjust width of RadialBarChart by changing its parent div's width */}
            <div className="w-[60%] mx-auto">
              {" "}
              {/* Adjusted width */}
              <RadialBarChart inputData={inputValue} dropdownValue={dropdownValue} selectedDate={selectedDate}/>
            </div>
          </div>
        </div>
      </div>

      {/* Card 1 Below */}
      <div className="lg:col-span-1 p-4">
        <div className="bg-white shadow-lg rounded-lg p-6 h-[35rem]">
          <h3 className="text-xl font-semibold mb-4">electricity chart</h3>
          <LineChart />
        </div>
      </div>
    </div>
  );
};

export default Economy;
