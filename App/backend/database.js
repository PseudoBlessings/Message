const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'mydatabase.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

function initializeDatabase(){
    db.serialize(()=>{
        db.run('CREATE TABLE IF NOT EXISTS Platforms (platform_id varchar(255) NOT NULL, PRIMARY KEY (platform_id))');
    });
}

module.exports = db;