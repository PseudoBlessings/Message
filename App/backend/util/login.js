

const { logDeveloperMode } = require('./debug.js');


function loadLoginPage(modalWindow, socialMedia, loginURL) {
    logDeveloperMode(`Loading ${socialMedia} Login Page...`);
    logDeveloperMode(`${socialMedia} Login Page URL: ${loginURL}`);
    modalWindow.loadURL(loginURL);
}

function handleLoginPageLoad(modalWindow, socialMedia, loginURL) {
    logDeveloperMode('Initiating 2 Second Delay Before Checking Successful Login...');
    setTimeout(() => {
        if (modalWindow.webContents.getURL() === loginURL) {
            logDeveloperMode(`${socialMedia} Login Page Loaded On First Try`);
            modalWindow.hide();
        } else {
            logDeveloperMode(`${socialMedia} Login Page Not Loaded On First Try...`);
            logDeveloperMode(`Revealing ${socialMedia} Login Page To User...`);
            modalWindow.show();
            logDeveloperMode(`${socialMedia} Login Page Revealed To User`);
            handleNavigationEvent(modalWindow, socialMedia, loginURL);
        }
    }, 2000);
}

function handleNavigationEvent(modalWindow, socialMedia, loginURL) {
    modalWindow.webContents.on('did-navigate', (event, url) => {
        logDeveloperMode(`Navigated to: ${url}`);
        if (url === loginURL) {
            logDeveloperMode('User Managed to Login Successfully');
            modalWindow.hide();
        }
    });
}

function Login(modalWindow, socialMedia, loginURL) {
    logDeveloperMode(`Getting ${socialMedia} Login Window Ready to Show...`);
    loadLoginPage(modalWindow, socialMedia, loginURL);
    handleLoginPageLoad(modalWindow, socialMedia, loginURL);
    return modalWindow;
}

module.exports = {
    loadLoginPage,
    handleLoginPageLoad,
    handleNavigationEvent,
    Login
};