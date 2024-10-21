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
          const [brokoliRows] = await connection.execute(`
            SELECT 
              dht1_temp,
              dht1_humi,
              moisture1,
              light,
              date
            FROM incubator
            ORDER BY date DESC
            LIMIT 10;
          `);

          const [kecambahRows] = await connection.execute(`
            SELECT 
              dht2_temp,
              dht2_humi,
              moisture2,
              light,
              date
            FROM incubator
            ORDER BY date DESC
            limit 10;
          `);

          const [avgRows] = await connection.execute(`
            SELECT 
                AVG((dht1_temp + dht2_temp) / 2) AS avg_temp,
                AVG((dht1_humi + dht2_humi) / 2) AS avg_humi,
                AVG((moisture1 + moisture2) / 2) AS avg_moisture,
                DATE(date) AS date
            FROM incubator
            GROUP BY DATE(date)
            ORDER BY date DESC
            LIMIT 5;
          `);

          const result = {
            infoBrokoli: brokoliRows[0] || { message: "No data for Brokoli" },
            infoKecambah: kecambahRows[0] || { message: "No data for Kecambah", },
            avgData: avgRows[0] || {message:"Data not found"},
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
