import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useParams } from "react-router-dom";


const RadialBarChart = ({ inputData, dropdownValue, selectedDate }) => {
  const BASEURL = process.env.REACT_APP_IP;
  const { id } = useParams();

  const [chartData, setChartData] = useState({
    series: [],
    labels: [],
  });

  const fetchData = async (timeFrame) => {
    try {
      let apiUrl;
      let body = {};

      if (timeFrame === "Daily") {
        apiUrl = `${BASEURL}/feedweight_date/${id}/`;
        body = { date: selectedDate.toISOString().split("T")[0] };
      } else if (timeFrame === "Weekly") {
        apiUrl = `${BASEURL}/feedweight_week/${id}/`;
        body = { date: selectedDate.toISOString().split("T")[0] };
      } else if (timeFrame === "Monthly") {
        apiUrl = `${BASEURL}/feedweight_month/${id}/`;
        body = {
          month: `${selectedDate.getFullYear()}-${String(
            selectedDate.getMonth() + 1
          ).padStart(2, "0")}`,
        };
      }

      const response = await axios.post(apiUrl, body);
      console.log("response", response);

      if (response.data && Array.isArray(response.data)) {
        const labels = [];
        const series = [];

        response.data.forEach((pond) => {
          const { pond_name, tasks } = pond;

          if (!pond_name || !tasks || !Array.isArray(tasks)) {
            console.warn("Invalid pond data:", pond);
            return;
          }

          // Add pond names to labels
          if (!labels.includes(pond_name)) {
            labels.push(pond_name);
          }

          // Aggregate feed weight for each pond
          const totalFeedWeight = tasks.reduce((sum, task) => {
            return task && typeof task.feed_weight === "number"
              ? sum + task.feed_weight
              : sum;
          }, 0);

          series.push(totalFeedWeight);
        });

        setChartData({ series, labels });
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(dropdownValue);
  }, [inputData, dropdownValue, selectedDate]); // Re-fetch data whenever inputData changes

  // Radial Bar Chart configuration
  const options = {
    chart: {
      height: 390,
      type: "radialBar",
      animations: {
        enabled: false, // Disable animations to avoid shakiness
      },
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: "30%",
          background: "transparent",
        },
        dataLabels: {
          name: {
            show: true,
          },
          value: {
            show: true,
          },
        },
      },
    },
    colors: ["#1ab7ea", "#0084ff", "#39539E", "#0077B5"],
    labels: chartData.labels,
    tooltip: {
      enabled: false, // Disable tooltips to remove hover effects
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            show: false,
          },
        },
      },
    ],
  };

  return (
    <div id="chart">
      <Chart
        options={options}
        series={chartData.series}
        type="radialBar"
        height={450}
      />
      {/* Display feed weight and cost below the chart */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {chartData.labels.map((label, index) => {
          const cost = chartData.series[index] * (parseFloat(inputData) || 0);
          return (
            <p key={index}>
              <strong>{label}:</strong> {chartData.series[index]} kg - ₹
              {cost.toFixed(2)}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default RadialBarChart;
