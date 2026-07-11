const conn = require('./_db');

module.exports = async (req, res) => {
    try {
        if (req.method === 'GET') {
            const result = await conn.execute('SELECT * FROM questions ORDER BY created_at DESC');
            
            const formattedRows = result.map(row => ({
                id: row.id,
                question: row.question,
                answer: row.answer,
                level: row.level,
                category: row.category || 'General',
                levelText: row.level === 1 ? 'Mudah' : row.level === 2 ? 'Sedang' : 'Sulit'
            }));

            return res.status(200).json(formattedRows);
        }
        
        if (req.method === 'POST') {
            const { question, answer, level, category } = req.body;

            if (!question || !answer || !level) {
                return res.status(400).json({ error: 'Missing required fields' });
            }

            const result = await conn.execute(
                'INSERT INTO questions (question, answer, level, category) VALUES (?, ?, ?, ?)',
                [question, answer, level, category || 'General']
            );
            
            return res.status(201).json({ 
                success: true, 
                id: result.lastInsertId ? result.lastInsertId.toString() : "1",
                message: 'Question added successfully' 
            });
        }
        
        if (req.method === 'DELETE') {
            const { id } = req.query;

            if (!id) {
                return res.status(400).json({ error: 'Missing question ID' });
            }

            await conn.execute('DELETE FROM questions WHERE id = ?', [id]);
            return res.status(200).json({ success: true, message: 'Question deleted successfully' });
        }

        return res.status(405).json({ error: 'Method not allowed' });
        
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Failed to process request', details: err.message });
    }
};
