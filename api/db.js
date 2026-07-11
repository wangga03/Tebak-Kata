const mysql = require('mysql2/promise');

// Create a connection pool instead of a single connection
// This is essential for serverless environments
const pool = mysql.createPool({
    uri: process.env.MYSQL_DATABASE_URL,
    waitForConnections: true,
    connectionLimit: 10,
    maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
    idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0
});

module.exports = pool;
