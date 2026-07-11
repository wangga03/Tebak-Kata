const conn = require('./_db');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        // Create table if not exists
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS admin_users (
                id INT PRIMARY KEY DEFAULT 1,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            )
        `);

        // Check if admin exists (we assume there's only 1 admin, id=1)
        const result = await conn.execute('SELECT * FROM admin_users WHERE id = 1');
        const rows = result;
        
        if (rows.length > 0) {
            // Update
            await conn.execute('UPDATE admin_users SET username = ?, password = ? WHERE id = 1', [username, password]);
        } else {
            // Insert
            await conn.execute('INSERT INTO admin_users (id, username, password) VALUES (1, ?, ?)', [username, password]);
        }

        res.status(200).json({ message: 'Profile updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update admin profile', details: err.message });
    }
};
