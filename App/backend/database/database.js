const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const database_utility = require("../util/database-utility")

const dbPath = path.resolve(__dirname, 'mydatabase.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        initializeDatabase();
    }
});

/**
 * fecthes all the availble Platforms from the database
 * @returns Object
 */
function fetchPlatforms(){
    database_utility.selectAllFromTable(db,"Platforms").then((row)=>{
        return row;
    });
}