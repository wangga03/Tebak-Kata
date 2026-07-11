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

    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Missing question ID' });
    }

    try {
        await pool.query('DELETE FROM questions WHERE id = ?', [id]);
        
        res.status(200).json({ 
            success: true, 
            message: 'Question deleted successfully' 
        });
    } catch (error) {
        console.error('Error deleting question:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
