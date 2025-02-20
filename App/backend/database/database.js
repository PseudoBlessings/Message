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

function initializeDatabase(){
    //initialize the database tables

    //initialize the Platforms table: this table will store the platforms that the user has accounts on
    database_utility.initializeDatabaseTables(db,[
        {table_name:"Platforms", table_columns:"platform_id varchar(255) NOT NULL, PRIMARY KEY (platform_id)"},
        {table_name:"Platform Accounts", table_columns:"account_id varchar(255) NOT NULL, platform_id varchar(255) NOT NULL, PRIMARY KEY (account_id), FOREIGN KEY(platform_id) REFERENCES Platforms(platform_id)"}
    ]);
    //initialize the Platform Accounts table: this table will store the accounts that the user has on the platforms
}

function deleteDatabase(){
    database_utility.deleteDatabaseFile(db,dbPath);
}

/**
 * 
 * @param {string} platform 
 */
function addPlatform(platform){
    database_utility.insertIntoTable(db,"Platforms",platform);
}

/**
 * 
 * @param {string} platform 
 */
function removePlatform(platform){
    database_utility.deleteFromTable(db,"Platforms",platform);
}

/**
 * fecthes all the availble Platforms from the database
 * @returns Object
 */
function fetchPlatforms(){
    database_utility.selectAllFromTable(db,"Platforms").then((row)=>{
        return row;
    });
}

module.exports = {db, dbPath, initializeDatabase, deleteDatabase, addPlatform, removePlatform, fetchPlatforms};