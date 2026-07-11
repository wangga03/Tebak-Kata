const mysql = require('mysql2/promise');

let url = process.env.MYSQL_DATABASE_URL;

// Pastikan parameter keamanan SSL ada di dalam URL
if (url && !url.includes('ssl=')) {
    url += (url.includes('?') ? '&' : '?') + 'ssl={"rejectUnauthorized":true}';
}

const pool = mysql.createPool(url);

module.exports = pool;
