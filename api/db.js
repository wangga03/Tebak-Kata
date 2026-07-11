const mysql = require('mysql2/promise');

// 1. Ekstrak informasi dari URL Vercel secara manual
const dbUrl = new URL(process.env.MYSQL_DATABASE_URL);
const dbPassword = decodeURIComponent(dbUrl.password); // Mencegah karakter spesial rusak

// 2. Buat koneksi secara absolut (memaksa SSL aktif)
const pool = mysql.createPool({
    host: dbUrl.hostname,
    port: dbUrl.port || 4000,
    user: dbUrl.username,
    password: dbPassword,
    database: dbUrl.pathname.replace('/', '') || 'test',
    ssl: {
        minVersion: 'TLSv1.2',
        rejectUnauthorized: true
    },
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10,
    idleTimeout: 60000,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

module.exports = pool;
