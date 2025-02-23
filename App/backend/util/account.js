const database = require('../database/database.js')

/**
 * Check if an account exists in the database
 * @param {string} account - A unique identifier for the account
 * @param {string} platform - A unique identifier for the platform
 * @returns {Promise<boolean>}
 */
async function doesAccountExists(account, platform) {
    const rows = await database.selectPlatformAccounts(account, platform);
    return rows.length > 0;
}

/**
 * Add an account to the database
 * @param {string} account - A unique identifier for the account
 * @param {string} platform - A unique identifier for the platform
 * @returns {Promise<void>}
 */
async function addAccount(account, platform) {
    const exists = await doesAccountExists(account);
    if (!exists) {
        await database.addPlatformAccount(account, platform);
    }
}

/**
 * Remove an account from the database
 * @param {string} account - A unique identifier for the account
 * @returns {Promise<void>}
 */
async function removeAccount(account, platform) {
    const exists = await doesAccountExists(account, platform);
    if (exists) {
        await database.removePlatformAccount(account, platform);
    }
}

module.exports = {
    doesAccountExists,
    addAccount,
    removeAccount
};
