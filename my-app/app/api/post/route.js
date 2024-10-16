import mysql from 'mysql2/promise';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      dht1_temp, dht1_humi,
      dht2_temp, dht2_humi,
      moisture1, moisture2, light // ,battery
    } = body;

    if (
      dht1_temp === undefined || dht1_humi === undefined ||
      dht2_temp === undefined || dht2_humi === undefined ||
      moisture1 === undefined || moisture2 === undefined ||
      light === undefined 
    //   || battery === undefined
    ) {
      return new Response(
        JSON.stringify({ error: 'Data tidak lengkap' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 3306,
      charset: 'utf8mb4',
      connectTimeout: 10000,
      multipleStatements: true,
    });

    const currentDate = new Date();

    const [result] = await connection.execute(
      `INSERT INTO incubator 
      (date, dht1_temp, dht1_humi, dht2_temp, dht2_humi, moisture1, moisture2, light) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, //tambahkan ? untuk battery
      [currentDate, dht1_temp, dht1_humi, dht2_temp, dht2_humi, moisture1, moisture2, light] //tambahkan battery jika setup plts sudah selesai
    );

    await connection.end();

    return new Response(
      JSON.stringify({ message: 'Data berhasil disimpan', result }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Database Error:', error);
    return new Response(
      JSON.stringify({ error: 'Gagal terhubung ke database', details: error.message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
