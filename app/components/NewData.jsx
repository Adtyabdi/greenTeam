"use client";

import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrasi komponen ChartJS
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const NewData = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const eventSource = new EventSource("/api/get");

    eventSource.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if (parsedData.avgData) {
        setData(prevData => [parsedData.avgData, ...prevData].slice(0, 5));
      }
    };

    eventSource.onerror = (error) => {
      console.error("EventSource failed:", error);
      setError("Failed to connect to the server. Please try again later.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Persiapkan data untuk chart
  const chartData = {
    labels: data.map(entry => entry.date), // Ambil tanggal dari data
    datasets: [
      {
        label: "Average Temperature (°C)",
        data: data.map(entry => entry.avg_temp), // Ambil avg_temp
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
      },
      {
        label: "Average Humidity (%)",
        data: data.map(entry => entry.avg_humi), // Ambil avg_humi
        borderColor: "rgba(54,162,235,1)",
        backgroundColor: "rgba(54,162,235,0.2)",
      },
      {
        label: "Average Moisture (%)",
        data: data.map(entry => entry.avg_moisture), // Ambil avg_moisture
        borderColor: "rgba(255,99,132,1)",
        backgroundColor: "rgba(255,99,132,0.2)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Average Sensor Data (Last 5 Entries)",
      },
    },
  };

  return (
    <>
      <div className="p-4">
        <div className="flex justify-center">
          <h1 className="text-xl font-semibold p-2 text-center w-full rounded-t-lg" style={{ background: "#D8FDCB" }}>
            Average Data Chart
          </h1>
        </div>
        <div className="flex justify-center w-full p-4" style={{ background: "#F0FEEB" }}>
          <Line data={chartData} options={chartOptions} />
        </div>
        {error && <div className="text-red-600">{error}</div>}
      </div>
    </>
  );
};

export default NewData;
