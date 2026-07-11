require('dotenv').config();
const conn = require('./api/db.js');

async function init() {
    try {
        await conn.execute(`
            CREATE TABLE IF NOT EXISTS game_settings (
                id INT PRIMARY KEY DEFAULT 1,
                game_pass VARCHAR(255) DEFAULT '123456',
                is_pass_active BOOLEAN DEFAULT false,
                is_game_started BOOLEAN DEFAULT false
            )
        `);
        // Ensure row with id=1 exists
        await conn.execute(`
            INSERT IGNORE INTO game_settings (id, game_pass, is_pass_active, is_game_started) 
            VALUES (1, '123456', false, false)
        `);
        console.log('Table game_settings created and initialized');
    } catch (e) {
        console.error(e);
    }
}
init();
