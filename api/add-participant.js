const conn = require('./db');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username } = req.body;
    if (!username) {
        return res.status(400).json({ error: 'Username is required' });
    }

    try {
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS participants (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL UNIQUE,
                current_level INT DEFAULT 0,
                last_active TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);

        // Check if user exists
        const checkResult = await conn.execute('SELECT * FROM participants WHERE username = ?', [username]);
        if (checkResult.length > 0) {
            // Update last_active
            await conn.execute('UPDATE participants SET last_active = CURRENT_TIMESTAMP WHERE username = ?', [username]);
        } else {
            // Insert new
            await conn.execute('INSERT INTO participants (username, current_level) VALUES (?, 0)', [username]);
        }

        res.status(200).json({ success: true, message: 'Participant recorded' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};
