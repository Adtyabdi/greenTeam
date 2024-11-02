// app/server.js
const { createServer } = require('http');
const next = require('next');
const { WebSocketServer } = require('ws');
const mysql = require('mysql2/promise');

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer((req, res) => {
    handle(req, res);
  });

  const wss = new WebSocketServer({ server });

  wss.on('connection', async (ws) => {
    console.log('Client connected to WebSocket');

    let connection;
    try {
      connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT || 3306,
        charset: 'utf8mb4',
      });
    } catch (error) {
      console.error('Database connection failed:', error);
      ws.send(JSON.stringify({ error: 'Database connection failed' }));
      ws.close();
      return;
    }

    const fetchData = async () => {
      try {
        const [brokoliRows] = await connection.execute(
          'SELECT dht1_temp, dht1_humi, moisture1, light, date FROM incubator ORDER BY date DESC LIMIT 1'
        );

        const [tabelBrokoliRows] = await connection.execute(
          'SELECT dht1_temp, dht1_humi, moisture1, light, DATE_FORMAT(date, \'%H:%i:%s\') AS formatted_date FROM incubator ORDER BY date DESC LIMIT 10'
        );

        const [kecambahRows] = await connection.execute(
          'SELECT dht2_temp, dht2_humi, moisture2, light, date FROM incubator ORDER BY date DESC LIMIT 1'
        );

        const [tabelKecambahRows] = await connection.execute(
          'SELECT dht2_temp, dht2_humi, moisture2, light, DATE_FORMAT(date, \'%H:%i:%s\') AS formatted_date FROM incubator ORDER BY date DESC LIMIT 10'
        );

        const result = {
          infoBrokoli: brokoliRows[0] || { message: 'Tidak ada data untuk Brokoli' },
          infoKecambah: kecambahRows[0] || { message: 'Tidak ada data untuk Kecambah' },
          tabelBrokoli: tabelBrokoliRows.length ? tabelBrokoliRows : [{ message: 'Data tidak ditemukan' }],
          tabelKecambah: tabelKecambahRows.length ? tabelKecambahRows : [{ message: 'Data tidak ditemukan' }],
        };

        ws.send(JSON.stringify(result));
      } catch (error) {
        console.error('Error fetching data:', error);
        ws.send(JSON.stringify({ error: 'Failed to fetch data', details: error.message }));
      }
    };

    fetchData();
    const intervalId = setInterval(fetchData, 1000);

    ws.on('close', () => {
      console.log('WebSocket connection closed');
      clearInterval(intervalId);
      connection.end();
    });

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      ws.close();
    };
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
