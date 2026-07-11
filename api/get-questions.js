const pool = require('./db');

module.exports = async (req, res) => {
    // Enable CORS if needed
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    try {
        const [rows] = await pool.query('SELECT * FROM questions ORDER BY created_at DESC');
        
        // Ensure data is formatted consistently with the frontend expectations
        const formattedRows = rows.map(row => ({
            id: row.id.toString(), // The frontend expects a string ID
            question: row.question,
            answer: row.answer,
            level: row.level,
            levelText: 'Level ' + row.level, // Or logic to map to 'Easy', 'Hard'
            category: row.category || 'General'
        }));

        res.status(200).json(formattedRows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get questions', details: err.message });
    }
};
