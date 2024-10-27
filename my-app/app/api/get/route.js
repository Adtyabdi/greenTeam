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
            LIMIT 1;
          `);

          const [tabelBrokoliRows] = await connection.execute(`
            SELECT
                dht1_temp,
                dht1_humi,
                moisture1, 
                light,
                DATE_FORMAT(date, ' %H:%i:%s') AS formatted_date
            FROM incubator
            ORDER BY date DESC
            LIMIT 10;
            `);

          const [tabelKecambahRows] = await connection.execute(`
            SELECT
                dht2_temp,
                dht2_humi,
                moisture2, 
                light,
                DATE_FORMAT(date, ' %H:%i:%s') AS formatted_date
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
            limit 1;
          `);

          const result = {
            infoBrokoli: brokoliRows[0] || { message: "No data for Brokoli" },
            infoKecambah: kecambahRows[0] || {
              message: "No data for Kecambah",
            },
            tabelBrokoli: tabelBrokoliRows.length
              ? tabelBrokoliRows
              : [{ message: "Data not found" }],
            tabelKecambah: tabelKecambahRows.length
              ? tabelKecambahRows
              : [{ message: "Data not found" }],
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
