const conn = require('./_db');

module.exports = async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            await conn.execute(`
                CREATE TABLE IF NOT EXISTS participants (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    current_level INT DEFAULT 0,
                    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);

            const result = await conn.execute('SELECT * FROM participants ORDER BY last_active DESC');
            return res.status(200).json(result);
        }

        if (req.method === 'POST') {
            // Handle text/plain or application/json from sendBeacon
            let data = req.body;
            if (typeof req.body === 'string') {
                try { data = JSON.parse(req.body); } catch(e){}
            }

            const username = data ? data.username : null;
            if (!username) {
                return res.status(400).json({ error: 'Username is required' });
            }

            // Check if it's a remove action via query param
            if (req.query.action === 'remove') {
                await conn.execute('DELETE FROM participants WHERE username = ?', [username]);
                return res.status(200).json({ success: true, message: 'Participant removed' });
            }

            // Otherwise, it's an add/update action
            await conn.execute(`
                CREATE TABLE IF NOT EXISTS participants (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(255) NOT NULL UNIQUE,
                    current_level INT DEFAULT 0,
                    last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
                )
            `);

            const checkResult = await conn.execute('SELECT * FROM participants WHERE username = ?', [username]);
            if (checkResult.length > 0) {
                await conn.execute('UPDATE participants SET last_active = CURRENT_TIMESTAMP WHERE username = ?', [username]);
            } else {
                await conn.execute('INSERT INTO participants (username, current_level) VALUES (?, 0)', [username]);
            }

            return res.status(200).json({ success: true, message: 'Participant recorded' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};
