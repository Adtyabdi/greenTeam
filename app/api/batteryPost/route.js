import mysql from 'mysql2/promise';

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      current, panelVoltage, batteryVoltage,
      batteryPercentage, temperatureCpanel, temperatureCbattery, lux
    } = body;

    if (
      current === undefined || panelVoltage === undefined || batteryVoltage === undefined ||
      batteryPercentage === undefined || temperatureCpanel === undefined || temperatureCbattery === undefined || lux === undefined
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
      `INSERT INTO battery 
      (date, current, panelVoltage, batteryVoltage, batteryPercentage, temperatureCpanel, temperatureCbattery, lux) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [currentDate, current, panelVoltage, batteryVoltage, batteryPercentage, temperatureCpanel, temperatureCbattery, lux]
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