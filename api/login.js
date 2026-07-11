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

        // Check if there is any admin user. If not, create a default one.
        const checkResult = await conn.execute('SELECT * FROM admin_users WHERE id = 1');
        if (checkResult.length === 0) {
            await conn.execute('INSERT INTO admin_users (id, username, password) VALUES (1, ?, ?)', ['admin', 'password']);
            // Allow login if they used default
            if (username === 'admin' && password === 'password') {
                return res.status(200).json({ success: true, message: 'Login successful' });
            } else {
                return res.status(401).json({ success: false, error: 'Invalid credentials. Default is admin/password' });
            }
        }

        // Validate against DB
        const result = await conn.execute('SELECT * FROM admin_users WHERE id = 1 AND username = ? AND password = ?', [username, password]);
        
        if (result.length > 0) {
            res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            res.status(401).json({ success: false, error: 'Invalid username or password' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};
