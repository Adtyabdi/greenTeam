export const dynamic = "force-dynamic";

import { db } from "@/app/lib/db";

export async function GET(req) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  try {
    const connection = await db();
    console.log("Database connected");

    const sendData = async () => {
      try {
        while (true) {
          const [rowsBattery] = await connection.execute(`
            SELECT 
              panelVoltage, 
              batteryVoltage, 
              FLOOR(batteryPercentage) AS batteryPercentage, 
              temperatureCpanel,  
              current, 
              (batteryVoltage * current) AS power, 
              lux 
            FROM battery 
            ORDER BY date DESC 
            LIMIT 1;
          `);

          const [rowsPanel] = await connection.execute(`
            SELECT 
              DATE_FORMAT(date, '%Y-%m-%d %H:00') AS grouped_datetime,
              AVG(panelVoltage) AS avg_panelVoltage,
              AVG(batteryVoltage) AS avg_batteryVoltage,
              FLOOR(AVG(batteryPercentage)) AS avg_batteryPercentage, 
              AVG(temperatureCpanel) AS avg_temperatureCpanel,
              AVG(current) AS avg_current,
              AVG(batteryVoltage * current) AS avg_power,
              AVG(lux) AS avg_lux
            FROM battery
            GROUP BY grouped_datetime
            ORDER BY grouped_datetime DESC
            LIMIT 10;
          `);

          const data = {
            latestBatteryData:
              rowsBattery.length > 0
                ? rowsBattery[0]
                : { message: "No battery data available" },
            averagePanelData: rowsPanel,
          };

          writer.write(`data: ${JSON.stringify(data)}\n\n`);

          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        writer.write(
          `data: ${JSON.stringify({
            message: "Error fetching data",
            error: error.message,
          })}\n\n`
        );
      }
    };

    sendData();

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (error) {
    console.error("Error in API route:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching data", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
