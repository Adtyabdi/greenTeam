import { db } from "@/app/lib/db";

export async function GET(request) {
  try {
    console.log('API called');
    const connection = await db();
    console.log('Database connected');

    const [rows] = await connection.execute(`SELECT 
          (dht1_temp + dht2_temp) / 2 AS avg_temp,
          (dht1_humi + dht2_humi) / 2 AS avg_humidity,
          (moisture1 + moisture2) / 2 AS avg_moisture,
          light,
          date
      FROM incubator
      ORDER BY date DESC;`);
    console.log('Data fetched from database:', rows);

    await connection.end();
    console.log('Database connection closed');

    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
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
