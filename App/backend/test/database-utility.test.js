const {dropTable, createTable, insertIntoTable,
    selectFromTable, updateTable, deleteFromTable, 
    selectAllFromTable, deleteAllFromTable, 
    runCommand, getCommand, initializeDatabaseTables, deleteDatabaseFile} = require('../util/database-utility.js');

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
    it('Should select values from a table without WHERE statement', ()=>{
        db.serialize(() =>{
            // insert value
            db.run(`INSERT INTO SelectFromTable (id) VALUES (1);`);
            // run select from Table (testing no where statement)
            selectFromTable(db,"SelectFromTable", "id").then((rows)=>{
                console.log(typeof rows);
                console.log(rows);
                expect(rows).toEqual([{ id: 1 }]);
            })
        });
    });
    it('Should select values from a table with WHERE statement', ()=>{
        //insert value
        db.run(`INSERT INTO SelectFromTable (id) VALUES (983);`);
        // run select from Table (testing with where statement)
        selectFromTable(db,"SelectFromTable", "id", "id = 983").then((rows)=>{
            console.log(typeof rows);
            console.log(rows);
            expect(rows).toEqual([{ id: 983 }]);
        })
    });
});
