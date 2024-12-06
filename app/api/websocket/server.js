import { WebSocketServer } from 'ws';
import mysql from 'mysql2/promise';

let wss;

export default async function handler(req, res) {
  if (!wss) {
    console.log('Initializing WebSocket Server');
    wss = new WebSocketServer({ noServer: true });

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

        // Handle incoming messages from client
        ws.on('message', async (message) => {
          const data = JSON.parse(message);
          await saveData(data, connection);
        });

        // Fetch data periodically
        const fetchData = async () => {
          const [brokoliRows] = await connection.execute(
            'SELECT dht1_temp, dht1_humi, moisture1, light, date FROM incubator ORDER BY date DESC LIMIT 1'
          );

          const [kecambahRows] = await connection.execute(
            'SELECT dht2_temp, dht2_humi, moisture2, light, date FROM incubator ORDER BY date DESC LIMIT 1'
          );

          const result = {
            infoBrokoli: brokoliRows[0] || { message: 'Tidak ada data untuk Brokoli' },
            infoKecambah: kecambahRows[0] || { message: 'Tidak ada data untuk Kecambah' },
          };

          ws.send(JSON.stringify(result));
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
      } catch (error) {
        console.error('Database connection failed:', error);
        ws.send(JSON.stringify({ error: 'Database connection failed' }));
        ws.close();
        return;
      }
    });
  }

  if (req.headers.upgrade === 'websocket') {
    res.socket.server.on('upgrade', (req, socket, head) => {
      wss.handleUpgrade(req, socket, head, (ws) => {
        wss.emit('connection', ws, req);
      });
    });
  } else {
    res.status(405).end(); // Method Not Allowed for non-upgrade requests
  }
}

async function saveData(data, connection) {
  const { dht1_temp, dht1_humi, dht2_temp, dht2_humi, moisture1, moisture2, light } = data;

  const currentDate = new Date();

  await connection.execute(
    `INSERT INTO incubator 
    (date, dht1_temp, dht1_humi, dht2_temp, dht2_humi, moisture1, moisture2, light) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, 
    [currentDate, dht1_temp, dht1_humi, dht2_temp, dht2_humi, moisture1, moisture2, light]
  );
}
