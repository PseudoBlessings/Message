const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const database_utility = require("../util/database-utility");
const { table } = require('console');

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
 * Function to initialize the database
 * No return value
 * No parameters
*/
function initializeDatabase(){
    //initialize the database tables

    //initialize the Platforms table: this table will store the platforms that the user has accounts on
    database_utility.initializeDatabaseTables(db,[
        {table_name:"Platforms", table_columns:"platform_id varchar(255) NOT NULL, PRIMARY KEY (platform_id)"},
        {table_name:"Platform Accounts", table_columns:"account_id varchar(255) NOT NULL, platform_id varchar(255) NOT NULL, PRIMARY KEY (account_id), FOREIGN KEY(platform_id) REFERENCES Platforms(platform_id)"}
    ]);
    //initialize the Platform Accounts table: this table will store the accounts that the user has on the platforms
}

/**
 * Function to delete the database
 * No return value
 * No parameters
 */
function deleteDatabase(){
    database_utility.deleteDatabaseFile(db,dbPath);
}

/**
 * Function to add a platform to the database
 * @param {string} platform 
 * No return value
 */
function addPlatform(platform){
    database_utility.insertIntoTable(db,"Platforms", {"platform_id": platform});
}

/**
 * Function to remove a platform from the database
 * @param {string} platform 
 * No return value
 */
function removePlatform(platform){
    database_utility.deleteFromTable(db,"Platforms", `platform_id = '${platform}'`);
}

/**
 * function to select a specific platform from the database
 * @param {string} platform
 * @returns {Object}
 */
function selectPlatforms(platform){
    return database_utility.selectFromTable(db,"Platforms", "*", `platform_id = '${platform}'`);
}

/**
 * fecthes all the availble Platforms from the database
 * @returns {Object}
 */
function fetchPlatforms(){
    return database_utility.selectAllFromTable(db,"Platforms");
}

/**
 * 
 * @param {string} account 
 * @param {string} platform 
 * @returns {None}
 */
function addPlatformAccount(account, platform){
    let data = {account_id: account, platform_id: platform};
    database_utility.insertIntoTable(db, "Platform Accounts", data);
}

/**
 * 
 * @param {string} account 
 * @param {string} platform 
 * @returns {None}
 */
function removePlatformAccount(account, platform){
    database_utility.deleteFromTable(db, "Platform Accounts", `account_id = '${account}' AND platform_id = '${platform}'`);
}

/**
 * 
 * @param {string} account
 * @param {string} platform 
 * @returns {Object}
 */
function selectPlatformAccounts(account, platform){
    if(account === undefined){
        return database_utility.selectFromTable(db, "Platform Accounts", "*", `platform_id = '${platform}'`);
    }

    if(platform === undefined){
        return database_utility.selectFromTable(db, "Platform Accounts", "*", `account_id = '${account}'`);
    }
    
    return database_utility.selectFromTable(db, "Platform Accounts", "*", `account_id = '${account}' AND platform_id = '${platform}'`);
}

function fetchPlatformAccounts(){
    return database_utility.selectAllFromTable(db, "Platform Accounts");
}

module.exports = {db, dbPath, initializeDatabase, deleteDatabase, addPlatform, 
    removePlatform, selectPlatforms, fetchPlatforms, addPlatformAccount, 
    removePlatformAccount, selectPlatformAccounts, fetchPlatformAccounts};