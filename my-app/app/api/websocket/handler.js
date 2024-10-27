import { WebSocketServer } from 'ws';
import mysql from 'mysql2/promise';

let wss;

export default function handler(req, res) {
  if (!wss) {
    // Inisialisasi WebSocket Server
    wss = new WebSocketServer({ noServer: true });

    wss.on('connection', async (ws) => {
      console.log('Klien terhubung ke WebSocket');

      // Membuat koneksi ke database
      const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        port: 3306,
        charset: 'utf8mb4',
      });

      const fetchData = async () => {
        try {
          const [brokoliRows] = await connection.execute(`
            SELECT dht1_temp, dht1_humi, moisture1, light, date
            FROM incubator
            ORDER BY date DESC
            LIMIT 1;
          `);

          const [tabelBrokoliRows] = await connection.execute(`
            SELECT dht1_temp, dht1_humi, moisture1, light, DATE_FORMAT(date, '%H:%i:%s') AS formatted_date
            FROM incubator
            ORDER BY date DESC
            LIMIT 10;
          `);

          const [kecambahRows] = await connection.execute(`
            SELECT dht2_temp, dht2_humi, moisture2, light, date
            FROM incubator
            ORDER BY date DESC
            LIMIT 1;
          `);

          const [tabelKecambahRows] = await connection.execute(`
            SELECT dht2_temp, dht2_humi, moisture2, light, DATE_FORMAT(date, '%H:%i:%s') AS formatted_date
            FROM incubator
            ORDER BY date DESC
            LIMIT 10;
          `);

          const result = {
            infoBrokoli: brokoliRows[0] || { message: 'Tidak ada data untuk Brokoli' },
            infoKecambah: kecambahRows[0] || { message: 'Tidak ada data untuk Kecambah' },
            tabelBrokoli: tabelBrokoliRows.length ? tabelBrokoliRows : [{ message: 'Data tidak ditemukan' }],
            tabelKecambah: tabelKecambahRows.length ? tabelKecambahRows : [{ message: 'Data tidak ditemukan' }],
          };

          // Kirim data ke klien
          ws.send(JSON.stringify(result));

          // Fetch data setiap 1 detik
          const intervalId = setInterval(fetchData, 1000);

          // Jika koneksi terputus, hentikan interval
          ws.on('close', () => {
            console.log('Koneksi WebSocket ditutup');
            clearInterval(intervalId);
            connection.end(); // Tutup koneksi database saat klien terputus
          });
        } catch (error) {
          console.error('Error mengambil data:', error);
          ws.send(JSON.stringify({ error: 'Gagal mengambil data', details: error.message }));
        }
      };

      fetchData(); // Panggil fungsi fetchData untuk mengirim data pertama kali
    });
  }

  // Periksa apakah permintaan adalah upgrade WebSocket
  if (req.headers.upgrade !== 'websocket') {
    res.status(400).send('Hanya WebSocket request yang diizinkan');
    return;
  }

  // Tangani upgrade request untuk WebSocket
  res.socket.server.on('upgrade', (req, socket, head) => {
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req);
    });
  });
}
