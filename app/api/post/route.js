import mysql from "mysql2/promise";

export async function POST(req) {
  try {
    const body = await req.text();
    console.log("Received raw data:", body);

    let data;
    try {
      data = JSON.parse(body);
    } catch (err) {
      console.error("Invalid JSON:", err.message);
      return new Response(
        JSON.stringify({ error: "Data yang dikirim tidak valid JSON" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const {
      // Data untuk incubator
      dht1_temp,
      dht1_humi,
      dht2_temp,
      dht2_humi,
      moisture1,
      moisture2,
      light,

      // Data untuk battery
      current,
      panelVoltage,
      batteryVoltage,
      batteryPercentage,
      temperatureCpanel,
      temperatureCbattery,
      lux
    } = data;

    if (
      dht1_temp === undefined ||
      dht1_humi === undefined ||
      dht2_temp === undefined ||
      dht2_humi === undefined ||
      moisture1 === undefined ||
      moisture2 === undefined ||
      light === undefined ||
      current === undefined ||
      panelVoltage === undefined ||
      batteryVoltage === undefined ||
      batteryPercentage === undefined ||
      temperatureCpanel === undefined ||
      temperatureCbattery === undefined ||
      lux === undefined
    ) {
      return new Response(
        JSON.stringify({ error: "Data tidak lengkap" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
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

    // Simpan data ke tabel 'incubator'
    const [resultIncubator] = await connection.execute(
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

    // Simpan data ke tabel 'battery'
    const [resultBattery] = await connection.execute(
      `INSERT INTO battery 
      (date, current, panelVoltage, batteryVoltage, batteryPercentage, temperatureCpanel, temperatureCbattery, lux) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        currentDate,
        current,
        panelVoltage,
        batteryVoltage,
        batteryPercentage,
        temperatureCpanel,
        temperatureCbattery,
        lux,
      ]
    );

    // Ambil data average dari tabel 'incubator'
    const [avgRows] = await connection.execute(`
      SELECT 
        (AVG(dht1_temp) + AVG(dht2_temp)) / 2 AS avg_temp,
        (AVG(dht1_humi) + AVG(dht2_humi)) / 2 AS avg_humi,
        (AVG(moisture1) + AVG(moisture2)) / 2 AS avg_moisture,
        AVG(light) AS avg_light
      FROM incubator
      WHERE date = (SELECT MAX(date) FROM incubator);
    `);

    // Ambil data setpoint dari tabel 'setpoint'
    const [rows] = await connection.execute(`
      SELECT 
        tempMax,
        tempMin,
        humiMax,
        humiMin
      FROM setpoint
      ORDER BY id DESC
      LIMIT 1;
    `);

    await connection.end();

    return new Response(
      JSON.stringify({
        message: "Data berhasil disimpan",
        incubatorResult: resultIncubator,
        batteryResult: resultBattery,
        avg_temp: avgRows[0]?.avg_temp,
        avg_humi: avgRows[0]?.avg_humi,
        avg_moisture: avgRows[0]?.avg_moisture,
        avg_light: avgRows[0]?.avg_light,
        tempMax: parseInt(rows[0]?.tempMax),
        humiMax: parseInt(rows[0]?.humiMax),
        batteryPercentage: batteryPercentage,
        light: light
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
    
  } catch (error) {
    console.error("Database Error:", error.message);

    return new Response(
      JSON.stringify({
        error: "Gagal terhubung ke database",
        details: error.message
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
