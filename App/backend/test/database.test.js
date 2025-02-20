const database = require("../database/database.js");
const { test, expect, it, describe } = require('@jest/globals');
const fs = require('fs');

describe('Database Tests', () => {
    describe('Function: initializeDatabase', () => {
        it('Should initialize Platforms and Platform Accounts', (done) => {
            database.initializeDatabase();
            database.db.all("SELECT * FROM sqlite_master WHERE type='table';", (err, rows) => {
                expect(err).toBeNull();
                console.log(rows);
                expect(rows[0]).toHaveProperty('name', 'Platforms');
                expect(rows[1]).toHaveProperty('name', 'Platform Accounts');
                done();
            });
        });
    });

    describe('Function: addPlatform', () => {
        it('Should add a platform to the database', (done) => {
            database.addPlatform("TestPlatform");
            database.db.all("SELECT * FROM Platforms;", (err, rows) => {
                expect(err).toBeNull();
                console.log(rows);
                expect(rows[0]).toHaveProperty('platform_id', 'TestPlatform');
                done();
            });
        });
    });

    describe('Function: removePlatform', () => {
        it('Should remove a platform from the database', (done) => {
            database.removePlatform("TestPlatform");
            database.db.all("SELECT * FROM Platforms;", (err, rows) => {
                expect(err).toBeNull();
                expect(rows).toHaveLength(0);
                done();
            });
        });
    });

    describe('Function: deleteDatabase', () => {
        it('Should delete the database file', (done) => {
            database.deleteDatabase();
            fs.access(database.dbPath, fs.F_OK, (err) => {
                expect(err).toBeNull();
                done();
            });
        });
    });
});