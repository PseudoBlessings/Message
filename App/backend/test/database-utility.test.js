const {dropTable, createTable, insertIntoTable,
    selectFromTable, updateTable, deleteFromTable, 
    selectAllFromTable, deleteAllFromTable, 
    runCommand, getCommand, initializeDatabaseTables, deleteDatabaseFile} = require('../util/database-utility.js');

const { test, expect, it, describe } = require('@jest/globals');

const sqlite3 = require('sqlite3').verbose();
const fs = require('fs');
const path = require('path');

const dbPath = path.resolve(__dirname, 'test.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

beforeAll((done) => {
    done();
});

afterAll((done) => {
    deleteDatabaseFile(db, dbPath);
    done();
},30000);

test('Function: dropTable | Should Drop the Table', (done) => {
    // create the table
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS DropTableTest (id INTEGER PRIMARY KEY);`);
        // run the function
        dropTable(db, "DropTableTest");
        // check the table doesn't exist
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='DropTableTest';", (err, row) => {
            expect(err).toBeNull();
            expect(row).toBe(undefined);
            done();
        });
    });
    
});

test('Function: createTable | Should create a Table', (done) => {
    //create the table
    db.serialize(() =>{
        createTable(db, "CreateTableTest", "id INTEGER PRIMARY KEY")
        // check the table exists
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='CreateTableTest';", (err, row) => {
            expect(err).toBeNull();
            console.log(row);
            expect(row).toHaveProperty('name', 'CreateTableTest');
            done();
        });
        //check the tables columns exist and are correct
        db.all("PRAGMA table_info(CreateTableTest);", (err, columns) => {
            expect(err).toBeNull();
            columns.forEach((column)=>{
                console.log(`- ${column.name}: (${column.type})`);
            })
            done();
        })
    });
    
});

test('Function: insertIntoTable | Should insert values into a Table', (done)=>{
    // create the table
    db.serialize(() => {
        db.run(`CREATE TABLE IF NOT EXISTS InsertIntoTable (id INTEGER PRIMARY KEY);`);
        insertIntoTable(db, "InsertIntoTable", "id", "1");
        db.get("SELECT * FROM InsertIntoTable;", (err, row) => {
            expect(err).toBeNull();
            expect(row).toHaveProperty('id', 1);
            done();
        })
    });
});

describe('selectFromTable',() => {
    db.run(`CREATE TABLE IF NOT EXISTS SelectFromTable (id INTEGER PRIMARY KEY);`);
    it('Should select values from a table without WHERE statement', (done)=>{
        db.serialize(() =>{
            // insert value
            db.run(`INSERT INTO SelectFromTable (id) VALUES (1);`);
            // run select from Table (testing no where statement)
            selectFromTable(db,"SelectFromTable", "id").then((rows)=>{
                console.log(typeof rows);
                console.log(rows);
                expect(rows).toEqual([{ id: 1 }]);
                done();
            })
        });
    });
    it('Should select values from a table with WHERE statement', (done)=>{
        db.serialize(()=>{
            //insert value
            db.run(`INSERT INTO SelectFromTable (id) VALUES (983);`);
            // run select from Table (testing with where statement)
            selectFromTable(db,"SelectFromTable", "id", "id = 983").then((rows)=>{
                console.log(typeof rows);
                console.log(rows);
                expect(rows).toEqual([{ id: 983 }]);
                done();
            })
        })
    });
});

describe('updateTable', ()=>{
    db.run(`CREATE TABLE IF NOT EXISTS UpdateTable (id INTEGER PRIMARY KEY);`);
    it('should update a row from a table', (done)=>{
        db.serialize(() =>{
            // add insert data
            db.run(`INSERT INTO UpdateTable (id) VALUES (983);`);
            db.run(`INSERT INTO UpdateTable (id) VALUES (91);`);
            db.run(`INSERT INTO UpdateTable (id) VALUES (4);`);
            db.run(`INSERT INTO UpdateTable (id) VALUES (40);`);
            // run the function
            updateTable(db, "UpdateTable", "id = 9", "id = 983");
            // check the value
            db.get("SELECT * FROM UpdateTable WHERE id = 9;", (err, row)=>{
                expect(err).toBeNull;
                console.log(row);
                expect(row.id).toEqual(9);
                done();
            })
        });
    });
});

describe('deleteFromTable', ()=>{
    db.run(`CREATE TABLE IF NOT EXISTS DeleteFromTable (id INTEGER PRIMARY KEY);`);
    it('should delete a row from a table', (done)=>{
        db.serialize(() =>{
            // add insert data
            db.run(`INSERT INTO DeleteFromTable (id) VALUES (983);`);
            db.run(`INSERT INTO DeleteFromTable (id) VALUES (91);`);
            db.run(`INSERT INTO DeleteFromTable (id) VALUES (4);`);
            db.run(`INSERT INTO DeleteFromTable (id) VALUES (40);`);
            // run the function
            deleteFromTable(db, "DeleteFromTable", "id = 91");
            // check the value
            db.get("SELECT * FROM DeleteFromTable WHERE id = 91;", (err, row)=>{
                expect(err).toBeNull;
                console.log(row);
                expect(row).toBe(undefined);
                done();
            })
        });
    });
});

describe('selectAllFromTable', ()=>{
    db.run(`CREATE TABLE IF NOT EXISTS SelectAllFromTable (id INTEGER PRIMARY KEY);`);
    it('should select all rows from a table', (done)=>{
        db.serialize(() =>{
            // add insert data
            db.run(`INSERT INTO SelectAllFromTable (id) VALUES (983);`);
            db.run(`INSERT INTO SelectAllFromTable (id) VALUES (91);`);
            db.run(`INSERT INTO SelectAllFromTable (id) VALUES (4);`);
            db.run(`INSERT INTO SelectAllFromTable (id) VALUES (40);`);
            // run the function
            selectAllFromTable(db, "SelectAllFromTable").then((rows)=>{
                console.log(rows);
                expect(rows).toEqual([{ id: 4 }, { id: 40 }, { id: 91 }, { id: 983 }]);
                done();
            });
        });
    });
}, 10000);

describe('deleteAllFromTable', ()=>{
    db.run(`CREATE TABLE IF NOT EXISTS DeleteAllFromTable (id INTEGER PRIMARY KEY);`);
    it('should delete all rows from a table', (done)=>{
        db.serialize(() =>{
            // add insert data
            db.run(`INSERT INTO DeleteAllFromTable (id) VALUES (983);`);
            db.run(`INSERT INTO DeleteAllFromTable (id) VALUES (91);`);
            db.run(`INSERT INTO DeleteAllFromTable (id) VALUES (4);`);
            db.run(`INSERT INTO DeleteAllFromTable (id) VALUES (40);`);
            // run the function
            deleteAllFromTable(db, "DeleteAllFromTable");
            // check the value
            db.all("SELECT * FROM DeleteAllFromTable;", (err, rows)=>{
                expect(err).toBeNull;
                console.log(rows);
                expect(rows).toEqual([]);
                done();
            });
        });
    });
});

describe('runCommand', ()=>{
    it('should run a command', (done)=>{
        runCommand(db, "CREATE TABLE IF NOT EXISTS RunCommandTest (id INTEGER PRIMARY KEY);");
        db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='RunCommandTest';", (err, row) => {
            expect(err).toBeNull();
            console.log(row);
            expect(row).toHaveProperty('name', 'RunCommandTest');
            done();
        });
    });
});

describe('getCommand', ()=>{
    it('should get a command', (done)=>{
        getCommand(db, "PRAGMA table_info(RunCommandTest);").then((rows)=>{
            console.log(rows);
            done();
        });
    });
});
