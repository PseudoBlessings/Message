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

function dropTable(table_name = "") {
    db.serialize(() => {
        db.run('DROP TABLE IF EXISTS ?', [table_name]);
    });

}

function createTable(table_name = "", columns = undefined) {
    if (columns !== undefined) {
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS ${table_name} (${columns})`);
        });
    }
}

function insertIntoTable(table_name = "", columns = "", values = "") {
    db.serialize(() => {
        db.run(`INSERT INTO ${table_name} (${columns}) VALUES (${values})`);
    });
}

function selectFromTable(table_name = "", columns = "*", where = "") {
    return new Promise((resolve, reject) => {
        db.all(`SELECT ${columns} FROM ${table_name} WHERE ${where}`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function updateTable(table_name = "", set = "", where = "") {
    db.serialize(() => {
        db.run(`UPDATE ${table_name} SET ${set} WHERE ${where}`);
    });
}

function deleteFromTable(table_name = "", where = "") {
    db.serialize(() => {
        db.run(`DELETE FROM ${table_name} WHERE ${where}`);
    });
}

function selectAllFromTable(table_name = "") {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM ${table_name}`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function deleteAllFromTable(table_name = "") {
    db.serialize(() => {
        db.run(`DELETE FROM ${table_name}`);
    });
}

function runCommand(command = "") {
    db.serialize(() => {
        db.run(command);
    });
}

function getCommand(command = "") {
    return new Promise((resolve, reject) => {
        db.get(command, (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function initializeDatabase(Tables = [{table_name:"", table_columns:""}]) {
    Tables.forEach((table) => {
        createTable(table.table_name, table.table_columns);
    });
}

function createPlatform(platform_id) {
    db.serialize(() => {
        db.run('INSERT INTO Platforms(platform_id) VALUES (?)', [platform_id]);
    });
}

function getPlatform(platform_id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM Platforms WHERE platform_id = ?', [platform_id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function getAllPlatforms() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM Platforms', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function createPlatformAccount(account_id, platform_id) {
    db.serialize(() => {
        db.run('INSERT INTO "Platform Accounts" (account_id, platform_id) VALUES (?, ?)', [account_id, platform_id]);
    });
}

function getPlatformAccount(account_id) {
    return new Promise((resolve, reject) => {
        db.get('SELECT * FROM "Platform Accounts" WHERE account_id = ?', [account_id], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });
}

function getAllPlatformAccounts() {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM "Platform Accounts"', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = { db, initializeDatabase, createPlatform, getPlatform, getAllPlatforms, createPlatformAccount, getPlatformAccount, getAllPlatformAccounts };