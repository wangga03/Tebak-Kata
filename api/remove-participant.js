const conn = require('./db');

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Handle text/plain or application/json from sendBeacon
        let data = req.body;
        if (typeof req.body === 'string') {
            try { data = JSON.parse(req.body); } catch(e){}
        }

        const username = data.username;
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }

        await conn.execute('DELETE FROM participants WHERE username = ?', [username]);

        res.status(200).json({ success: true, message: 'Participant removed' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error', details: err.message });
    }
};
