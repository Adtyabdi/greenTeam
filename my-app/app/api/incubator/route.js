import { db } from "@/app/lib/db";

export async function GET(request) {
  try {
    console.log('API called');
    const connection = await db();
    console.log('Database connected');

    const [rows] = await connection.execute('SELECT * FROM incubator');
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
