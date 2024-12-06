import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      dht1_temp,
      dht1_humi,
      dht2_temp,
      dht2_humi,
      moisture1,
      moisture2,
      light,
    } = body;

    if (
      dht1_temp === undefined ||
      dht1_humi === undefined ||
      dht2_temp === undefined ||
      dht2_humi === undefined ||
      moisture1 === undefined ||
      moisture2 === undefined ||
      light === undefined
    ) {
      return new Response(JSON.stringify({ error: "Data tidak lengkap" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      port: 3306,
      charset: "utf8mb4",
      connectTimeout: 10000,
      multipleStatements: true,
    });

    const currentDate = new Date();

    const [result] = await connection.execute(
      `INSERT INTO incubator 
      (date, dht1_temp, dht1_humi, dht2_temp, dht2_humi, moisture1, moisture2, light) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        currentDate,
        dht1_temp,
        dht1_humi,
        dht2_temp,
        dht2_humi,
        moisture1,
        moisture2,
        light,
      ]
    );

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

    const [rows] = await connection.execute(`
      SELECT 
           tempMax,
           tempMin,
           humiMax,
           humiMin
       FROM 
           setpoint
       ORDER BY 
           id DESC
       LIMIT 1;`);

    await connection.end();

    console.log(avgRows[0].avg_temp);

    return new Response(
      JSON.stringify({
        message: "Data berhasil disimpan",
        result,
        avg_temp: avgRows[0].avg_temp,
        tempMax: parseInt(rows[0].tempMax),
        avg_humi: parseInt(avgRows[0].avg_humi),
        humiMax: parseInt(rows[0].humiMax),
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Database Error:", error);
    return new Response(
      JSON.stringify({
        error: "Gagal terhubung ke database",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
