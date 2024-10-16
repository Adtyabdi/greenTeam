import { db } from "@/app/lib/db";

export async function GET(req) {
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  try {
    const connection = await db();
    console.log('Database connected');

    const sendData = async () => {
      try {
        while (true) {
          const [rows] = await connection.execute(`
            SELECT 
              (dht1_temp + dht2_temp) / 2 AS avg_temp,
              (dht1_humi + dht2_humi) / 2 AS avg_humidity,
              (moisture1 + moisture2) / 2 AS avg_moisture,
              light,
              date
            FROM incubator
            ORDER BY date DESC
            LIMIT 1;
          `);

          if (rows.length > 0) {
            writer.write(`data: ${JSON.stringify(rows[0])}\n\n`);
          } else {
            writer.write(`data: ${JSON.stringify({ message: 'No data available' })}\n\n`);
          }

          // Delay kecil untuk menghindari penggunaan CPU yang tinggi
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        writer.write(`data: ${JSON.stringify({ message: 'Error fetching data', error: error.message })}\n\n`);
      }
    };

    // Panggil fungsi pengiriman data
    sendData();

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive',
        'Access-Control-Allow-Origin': '*', 
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);
    return new Response(JSON.stringify({ message: 'Error fetching data', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
