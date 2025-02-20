// Utility functions for database operations
//@ts-check
const sqlite3 = require('sqlite3').verbose();
const { Database } = require('sqlite3');
const fs = require('fs');
/**
 * Drop a table from the database
 * @param {Database} database - The database to drop the table from
 * @param {string} table_name - The name of the table to drop
 */
function dropTable(database, table_name) {
    database.serialize(() => {
        database.run(`DROP TABLE IF EXISTS "${table_name}"`);
    });

}

/**
 * Create a table for the database
 * @param {Database} database - The database recieving the table
 * @param {string} table_name - The name of the created table
 * @param {string} columns - The columns of the created table (optional)
 */
function createTable(database, table_name, columns = "") {
    if (columns !== "") {
        database.serialize(() => {
            database.run(`CREATE TABLE IF NOT EXISTS "${table_name}" (${columns});`);
        });
    }
    else{
            database.serialize(() => {
                database.run(`CREATE TABLE IF NOT EXISTS "${table_name}"`);
        });
    }
}

/**
 * Insert values/Data into Table
 * @param { Database } database - The database 
 * @param { string } table_name - The table
 * @param { string } columns - The columns
 * @param { string|number|boolean } values - The values
 */
function insertIntoTable(database, table_name, columns, values) {
    database.serialize(() => {
        if(typeof values === "string"){
            values = `'${values}'`;
        }

        else if(typeof values === "boolean"){
            values = values ? 1 : 0;
        }

        database.run(`INSERT INTO "${table_name}" (${columns}) VALUES (${values});`);
    });
}

/**
 * Fetching values from table 
 * @param {Database} database - The database where the value comes from
 * @param {string} table_name - The table where the value comes from
 * @param {string} columns - The columns where the value comes from
 * @param {string} where - The where statement to choose the value
 * @returns
 */
function selectFromTable(database, table_name, columns = "*", where = "") {
    return new Promise((resolve, reject) => {
        if(where !== ""){
            database.all(`SELECT ${columns} FROM "${table_name}" WHERE ${where}`, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }
        else{
            database.all(`SELECT ${columns} FROM "${table_name}"`, (err, rows) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }
    });
}

/**
 * 
 * @param {Database} database 
 * @param {string} table_name 
 * @param {string} set 
 * @param {string} where 
 */
function updateTable(database, table_name, set, where) {
    database.serialize(() => {
        database.run(`UPDATE "${table_name}" SET ${set} WHERE ${where};`);
    });
}

/**
 * 
 * @param {Database} database 
 * @param {string} table_name 
 * @param {string} where 
 */
function deleteFromTable(database, table_name = "", where = "") {
    database.serialize(() => {
        database.run(`DELETE FROM "${table_name}" WHERE ${where}`);
    });
}

/**
 * 
 * @param {Database} database 
 * @param {string} table_name 
 * @returns 
 */
function selectAllFromTable(database, table_name = "") {
    return new Promise((resolve, reject) => {
        database.all(`SELECT * FROM "${table_name}"`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

/**
 * 
 * @param {Database} database 
 * @param {string} table_name 
 */
function deleteAllFromTable(database, table_name = "") {
    database.serialize(() => {
        database.run(`DELETE FROM "${table_name}"`);
    });
}

/**
 * 
 * @param {Database} database 
 * @param {string} command 
 */
function runCommand(database, command = "") {
    database.serialize(() => {
        database.run(command);
    });
}

/**
 * 
 * @param {Database} database 
 * @param {string} command 
 * @returns 
 */
function getCommand(database, command = "") {
    return new Promise((resolve, reject) => {
        database.all(command, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

/**
 * 
 * @param {Database} database
 * @param {[{table_name:string, table_columns:string}]} Tables 
 */
function initializeDatabaseTables(database, Tables = [{table_name:"", table_columns:""}]) {
    Tables.forEach((table) => {
        createTable(database, table.table_name, table.table_columns);
    });
}

/**
 * 
 * @param {Database} database 
 * @param {string} database_path 
 * @param {number} retryCount 
 */
function deleteDatabaseFile(database, database_path, retryCount = 5) {
    database.close((err) => {
        if (err) {
            console.error('Error closing database:', err.message);
        } else {
            console.log('Database connection closed.');

            // Function to attempt deleting the file
            function attemptDelete(retries) {
                fs.unlink(database_path, (err) => {
                    if (err && err.code === 'EBUSY' && retries > 0) {
                        console.error('Resource busy, retrying deletion...');
                        setTimeout(() => attemptDelete(retries - 1), 1000); // Retry after 1 second
                    } else if (err) {
                        console.error('Error deleting database file:', err);
                    } else {
                        console.log('Database file deleted.');
                    }
                });
            }

            // Attempt to delete the file with retries
            attemptDelete(retryCount);
        }
    });
}

module.exports = {
    dropTable,
    createTable,
    insertIntoTable,
    selectFromTable,
    updateTable,
    deleteFromTable,
    selectAllFromTable,
    deleteAllFromTable,
    runCommand,
    getCommand,
    initializeDatabaseTables,
    deleteDatabaseFile
};