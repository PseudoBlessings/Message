const account = require('../util/account.js');
const database = require('../database/database.js');
const { test, expect, it, describe } = require('@jest/globals');

beforeAll((done) => {
    database.initializeDatabase();
    done();
});

afterAll((done) => {
    database.deleteDatabase();
    done();
}, 30000);

describe('Account Tests', () => {
    describe('Function: doesAccountExists', () => {
        it('Should return false if the account does not exist', async () => {
            const result = await account.doesAccountExists('account1');
            expect(result).toBe(false);
        });

        it('Should return true if the account exists', async () => {
            await database.addPlatformAccount('account1', 'platform1');
            const result = await account.doesAccountExists('account1');
            expect(result).toBe(true);
            await database.removePlatformAccount('account1', 'platform1');
        });
    });

    describe('Function: addAccount', () => {
        it('Should add an account to the database', async () => {
            await account.addAccount('account1', 'platform1');
            const result = await account.doesAccountExists('account1', 'platform1');
            expect(result).toBe(true);
            await database.removePlatformAccount('account1', 'platform1');
        });
    });

    describe('Function: removeAccount', () => {
        it('Should remove an account from the database', async () => {
            await account.addAccount('account1', 'platform1');
            await account.removeAccount('account1', 'platform1');
            const result = await account.doesAccountExists('account1', 'platform1');
            expect(result).toBe(false);
        });
    });
});