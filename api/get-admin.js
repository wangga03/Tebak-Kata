const conn = require('./db');

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Create table if not exists so it doesn't crash on first load
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id INT PRIMARY KEY DEFAULT 1,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);

        const result = await conn.execute('SELECT username FROM admin_users WHERE id = 1');
        const rows = result.rows;
        
        if (rows.length > 0) {
            res.status(200).json({ username: rows[0].username });
        } else {
            res.status(200).json({ username: '' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get admin profile', details: err.message });
    }
};
