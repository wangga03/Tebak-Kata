const conn = require('./db');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { question, answer, level, category } = req.body;

    if (!question || !answer || !level) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const result = await conn.execute(
            'INSERT INTO questions (question, answer, level, category) VALUES (?, ?, ?, ?)',
            [question, answer, level, category || 'General']
        );
        
        res.status(201).json({ 
            success: true, 
            id: result.lastInsertId ? result.lastInsertId.toString() : "1",
            message: 'Question added successfully' 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add question', details: err.message });
    }
};
