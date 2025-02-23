const database = require('../database/database.js');

/**
 * Check if any platform exists in the database
 * @returns {Promise<boolean>}
 */
async function doesAnyPlatformExists() {
    const rows = await database.fetchPlatforms();
    return rows.length > 0;
}

/**
 * Check if a specific platform exists in the database
 * @param {string} platform - A unique identifier for the platform
 * @returns {Promise<boolean>}
 */
async function doesPlatformExists(platform) {
    const rows = await database.selectPlatforms(platform);
    return rows.length > 0;
}

/**
 * Add a platform to the database
 * @param {string} platform - A unique identifier for the platform
 * @returns {Promise<void>}
 */
async function addPlatform(platform) {
    const exists = await doesPlatformExists(platform);
    if (!exists) {
        await database.addPlatform(platform);
    }
}

/**
 * Remove a platform from the database
 * @param {string} platform - A unique identifier for the platform
 * @returns {Promise<void>}
 */
async function removePlatform(platform) {
    const exists = await doesPlatformExists(platform);
    if (exists) {
        await database.removePlatform(platform);
    }
}

module.exports = {
    doesAnyPlatformExists,
    doesPlatformExists,
    addPlatform,
    removePlatform
}