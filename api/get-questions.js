const conn = require('./db');

module.exports = async (req, res) => {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const result = await conn.execute('SELECT * FROM questions ORDER BY created_at DESC');
        
        const formattedRows = result.rows.map(row => ({
            id: row.id,
            question: row.question,
            answer: row.answer,
            level: row.level,
            category: row.category || 'General',
            levelText: row.level === 1 ? 'Mudah' : row.level === 2 ? 'Sedang' : 'Sulit'
        }));

        res.status(200).json(formattedRows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to get questions', details: err.message });
    }
};
