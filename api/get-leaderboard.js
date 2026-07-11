const conn = require('./db');

module.exports = async function handler(req, res) {
    if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
    
    try {
        try {
            await conn.execute('ALTER TABLE participants ADD COLUMN score INT DEFAULT 0');
        } catch (e) {
            // Ignore if column already exists
        }
        
        const result = await conn.execute('SELECT username, score, current_level FROM participants ORDER BY score DESC, last_active DESC LIMIT 50');
        res.status(200).json(result);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
