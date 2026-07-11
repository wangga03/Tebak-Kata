const conn = require('./_db');

module.exports = async function handler(req, res) {
    try {
        if (req.method === 'GET') {
            try { await conn.execute('ALTER TABLE participants ADD COLUMN score INT DEFAULT 0'); } catch (e) {}
            const result = await conn.execute('SELECT username, score, current_level FROM participants ORDER BY score DESC, last_active DESC LIMIT 50');
            return res.status(200).json(result);
        }
        
        if (req.method === 'POST') {
            const { username, score } = req.body;
            if (!username) return res.status(400).json({ error: 'Username required' });
            
            try { await conn.execute('ALTER TABLE participants ADD COLUMN score INT DEFAULT 0'); } catch (e) {}
            await conn.execute('UPDATE participants SET score = GREATEST(IFNULL(score, 0), ?) WHERE username = ?', [score || 0, username]);
            return res.status(200).json({ success: true });
        }

        if (req.method === 'DELETE') {
            await conn.execute('UPDATE participants SET score = 0, current_level = 0');
            return res.status(200).json({ success: true, message: 'Leaderboard reset successfully' });
        }
        
        return res.status(405).json({ error: 'Method not allowed' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: err.message });
    }
};
