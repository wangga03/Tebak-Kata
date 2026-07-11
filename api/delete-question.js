const conn = require('./db');

module.exports = async (req, res) => {
    if (req.method !== 'DELETE') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { id } = req.query;

    if (!id) {
        return res.status(400).json({ error: 'Missing question ID' });
    }

    try {
        await conn.execute('DELETE FROM questions WHERE id = ?', [id]);
        res.status(200).json({ success: true, message: 'Question deleted successfully' });
    } catch (err) {
        console.error('Error deleting question:', err);
        res.status(500).json({ error: 'Failed to delete question', details: err.message });
    }
};
