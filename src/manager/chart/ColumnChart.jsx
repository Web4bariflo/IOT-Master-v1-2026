import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";
import { useParams } from "react-router-dom";
import { SlCalender } from "react-icons/sl";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ColumnChart = ({ dropdownValue, selectedDate }) => {
  const BASEURL = process.env.REACT_APP_IP;
  const { id } = useParams();
  // const [selectedValue, setSelectedValue] = useState("Daily");
  const [chartData, setChartData] = useState({
    series: [],
    categories: [],
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
        const categories = [];
        const series = [];

        response.data.forEach((pond) => {
          const { pond_name, tasks } = pond;

          if (!pond_name || !tasks || !Array.isArray(tasks)) {
            console.warn("Invalid pond data:", pond);
            return;
          }

          if (!categories.includes(pond_name)) {
            categories.push(pond_name);
          }

          tasks.forEach((task, index) => {
            if (!task || typeof task.feed_weight !== "number") {
              console.warn("Invalid task data:", task);
              return;
            }

            if (!series[index]) {
              series[index] = {
                name: `Task ${index + 1}`,
                data: Array(categories.length).fill(0),
              };
            }

            const pondIndex = categories.indexOf(pond_name);
            series[index].data[pondIndex] = task.feed_weight;
          });
        });

        setChartData({
          series: series.filter((s) => s),
          categories: categories.filter((c) => c),
        });
      } else {
        console.error("Unexpected data format:", response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(dropdownValue);
  }, [dropdownValue, selectedDate]);

  const chartOptions = {
    chart: {
      height: 350,
      type: "bar",
      stacked: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        borderRadius: 5,
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 6,
      colors: ["transparent"],
    },
    xaxis: {
      categories: chartData.categories || [],
      title: {
        text: "Pond Names",
      },
    },
    yaxis: {
      title: {
        text: "Feed Weight (kg)",
      },
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return `${val} kg`;
        },
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "top",
      offsetY: 0,
    },
    grid: {
      padding: {
        left: 20,
        right: 20,
      },
    },
  };

  return (
    <div className="relative">
      <Chart
        options={chartOptions}
        series={chartData.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ColumnChart;
