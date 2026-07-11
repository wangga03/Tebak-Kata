const conn = require('./db');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
    const { username, score } = req.body;
    if (!username) return res.status(400).json({ error: 'Username required' });
    
    try {
        try {
            await conn.execute('ALTER TABLE participants ADD COLUMN score INT DEFAULT 0');
        } catch (e) {
            // Ignore if column already exists
        }
        
        await conn.execute('UPDATE participants SET score = GREATEST(IFNULL(score, 0), ?) WHERE username = ?', [score || 0, username]);
        
        res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};
