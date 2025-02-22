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
        beforeEach((done) => {
            database.db.run("DELETE FROM Platforms;", done);
        });
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

    describe('Function: selectFromTable', () => {
        beforeEach((done) => {
            database.addPlatform("TestPlatform");
            done();
        });
        database.db.serialize(()=>{
            database.addPlatform("TestPlatform");
            it('Should select a platform from the database', (done) => {
                database.selectPlatforms("TestPlatform").then((rows) => {
                    console.log(rows);
                    expect(rows).toHaveLength(1);
                    done();
                });
            });
        });
    });

    describe('Function: fetchPlatforms', () => {
        it('Should fetch all platforms from the database', (done) => {
            database.fetchPlatforms().then((rows) => {
                console.log(rows);
                expect(rows).toHaveLength(1);
                done();
            });
        });
    });

    describe('Function: addPlatformAccount', () => {
        it('Should add a platform account to the database', (done) => {
            database.addPlatformAccount("TestAccount", "TestPlatform");
            database.db.all("SELECT * FROM 'Platform Accounts';", (err, rows) => {
                expect(err).toBeNull();
                console.log(rows);
                expect(rows[0]).toHaveProperty('account_id', 'TestAccount');
                expect(rows[0]).toHaveProperty('platform_id', 'TestPlatform');
                done();
            });
        });
    });

    describe('Function: removePlatformAccount', () => {
        it('Should remove a platform account from the database', (done) => {
            database.removePlatformAccount("TestAccount", "TestPlatform");
            database.db.all("SELECT * FROM 'Platform Accounts';", (err, rows) => {
                expect(err).toBeNull();
                expect(rows).toHaveLength(0);
                done();
            });
        });
    });

    describe('Function: selectPlatformAccounts', () => {
        it('Should select a platform account from the database', (done) => {
            database.addPlatformAccount("TestAccount", "TestPlatform");
            database.selectPlatformAccounts("TestAccount", "TestPlatform").then((rows) => {
                console.log(rows);
                expect(rows).toHaveLength(1);
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