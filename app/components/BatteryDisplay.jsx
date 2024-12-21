'use client';

import React, { useEffect, useState } from "react";

const BatteryDisplay = () => {
  const [batteryPercentage, setBatteryPercentage] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource("/api/batteryGet");

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (
          data.latestBatteryData &&
          data.latestBatteryData.batteryPercentage !== undefined
        ) {
          setBatteryPercentage(data.latestBatteryData.batteryPercentage);
        }
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = (error) => {
      console.error("SSE connection error:", error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  const getBatteryStyle = () => ({
    width: `${batteryPercentage}%`,
    backgroundColor: batteryPercentage > 20 ? "#16FF00" : "#FF1700",
    height: "100%",
  });

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          width: "40px",
          height: "20px",
          border: "2px solid black",
          position: "relative",
        }}
      >
        <div style={getBatteryStyle()}></div>
        <div
          style={{
            width: "5px",
            height: "10px",
            backgroundColor: "black",
            position: "absolute",
            top: "50%",
            right: "-7px",
            transform: "translateY(-50%)",
          }}
        ></div>
      </div>
      <span>{batteryPercentage}%</span>
    </div>
  );
};

export default BatteryDisplay;
