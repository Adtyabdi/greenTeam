import { db } from "@/app/lib/db";

export async function GET(request) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  try {
    const connection = await db();
    console.log("Database connected");

    const sendData = async () => {
      try {
        while (true) {
          const [avgRows] = await connection.execute(`
            SELECT 
              (AVG(latest.dht1_temp) + AVG(latest.dht2_temp)) / 2 AS avg_temp,
              (AVG(latest.dht1_humi) + AVG(latest.dht2_humi)) / 2 AS avg_humi,
              (AVG(latest.moisture1) + AVG(latest.moisture2)) / 2 AS avg_moisture,
              AVG(latest.light) AS avg_light
            FROM (
              SELECT 
                dht1_temp,
                dht1_humi,
                moisture1,
                dht2_temp,
                dht2_humi,
                moisture2,
                light
              FROM incubator
              WHERE date = (SELECT MAX(date) FROM incubator)
            ) AS latest;
          `);

          const result = {
            avgData: avgRows[0] || { message: "No data available" },
          };

          writer.write(`data: ${JSON.stringify(result)}\n\n`);
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
