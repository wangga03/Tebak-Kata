const conn = require('./_db');

module.exports = async function handler(req, res) {
    // Ensure table exists
    await conn.execute(`
        CREATE TABLE IF NOT EXISTS game_settings (
            id INT PRIMARY KEY DEFAULT 1,
            game_pass VARCHAR(255) DEFAULT '-',
            is_pass_active BOOLEAN DEFAULT false,
            is_game_started BOOLEAN DEFAULT false
        )
    `);
    
    await conn.execute(`
        INSERT IGNORE INTO game_settings (id, game_pass, is_pass_active, is_game_started) 
        VALUES (1, '-', false, false)
    `);

    if (req.method === 'GET') {
        try {
            const results = await conn.execute('SELECT * FROM game_settings WHERE id = 1');
            // Check if results exists and has elements
            if (results && results.length > 0) {
                return res.status(200).json(results[0]);
            } else {
                return res.status(200).json({ game_pass: '-', is_pass_active: false, is_game_started: false });
            }
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else if (req.method === 'POST') {
        try {
            const { action, game_pass } = req.body;
            if (action === 'activate') {
                await conn.execute('UPDATE game_settings SET is_pass_active = true, game_pass = ? WHERE id = 1', [game_pass]);
            } else if (action === 'deactivate') {
                await conn.execute('UPDATE game_settings SET is_pass_active = false, game_pass = "-" WHERE id = 1');
            } else if (action === 'start_game') {
                await conn.execute('UPDATE game_settings SET is_game_started = true WHERE id = 1');
            } else if (action === 'stop_game') {
                await conn.execute('UPDATE game_settings SET is_game_started = false WHERE id = 1');
            }
            return res.status(200).json({ success: true });
        } catch (error) {
            return res.status(500).json({ error: error.message });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
