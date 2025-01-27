const env = process.env.NODE_ENV || 'development';

function developerMode()
{
    if(env === 'development') {
        return true;
    }
    else {
        return false;
    }
}

function logDeveloperMode(message) {
    if (developerMode) {
        console.log(message);
    }
}

module.exports = {
    env,
    developerMode,
    logDeveloperMode
};