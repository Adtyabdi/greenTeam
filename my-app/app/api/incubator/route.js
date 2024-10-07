import { db } from "@/app/lib/db";

export async function GET(request) {
  try {
    console.log('API called');
    const connection = await db();
    console.log('Database connected');

    // Menjalankan query
    const [rows] = await connection.execute('SELECT * FROM incubator');
    console.log('Data fetched from database:', rows);

    // Menutup koneksi
    await connection.end();
    console.log('Database connection closed');

    // Mengirim data ke client
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in API route:', error);

    // Pastikan selalu mengembalikan response saat terjadi error
    return new Response(JSON.stringify({ message: 'Error fetching data', error: error.message }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
