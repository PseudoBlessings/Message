const platform = require('../util/platform.js');
const database = require('../database/database.js');
const { test, expect, it, describe, beforeAll, afterAll } = require('@jest/globals');

beforeAll((done) => {
    database.initializeDatabase();
    done();
});

afterAll((done) => {
    database.deleteDatabase();
    done();
}, 30000);

describe('Platform Tests', () => {
    describe('Function: doesAnyPlatformExists', () => {
        it('Should return false if no platforms exist', async () => {
            const result = await platform.doesAnyPlatformExists();
            expect(result).toBe(false);
        });

        it('Should return true if a platform exists', async () => {
            database.addPlatform('platform1');
            const result = await platform.doesAnyPlatformExists();
            expect(result).toBe(true);
            database.removePlatform('platform1');
        });
    });

    describe('Function: doesPlatformExists', () => {
        it('Should return false if the platform does not exist', async () => {
            const result = await platform.doesPlatformExists('platform1');
            expect(result).toBe(false);
        });
        it('Should return true if the platform exists', async () => {
            database.addPlatform('platform1');
            const result = await platform.doesPlatformExists('platform1');
            expect(result).toBe(true);
            database.removePlatform('platform1');
        });
    });

    describe('Function: addPlatform', () => {
        it('Should add a platform to the database', async () => {
            await platform.addPlatform('platform1');
            const result = await platform.doesAnyPlatformExists();
            expect(result).toBe(true);
        });
    });

    describe('Function: removePlatform', () => {
        it('Should remove a platform from the database', async () => {
            await platform.removePlatform('platform1');
            const result = await platform.doesAnyPlatformExists();
            expect(result).toBe(false);
        });
    });
});