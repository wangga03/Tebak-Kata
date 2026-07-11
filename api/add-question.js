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

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { question, answer, level, category } = req.body;

    if (!question || !answer || !level) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO questions (question, answer, level, category, created_at) VALUES (?, ?, ?, ?, NOW())',
            [question, answer, level, category || 'General']
        );
        
        res.status(201).json({ 
            success: true, 
            id: result.insertId.toString(),
            message: 'Question added successfully' 
        });
    } catch (error) {
        console.error('Error adding question:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
