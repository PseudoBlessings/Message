
const {app,ipcMain, contextBridge, BrowserWindow, session} = require('electron');
const env = process.env.NODE_ENV || 'development';
__sourcereact = "Frontend\\client\\src"
__mainwindowid = 0;

const url = require('url');
const path = require('path');
const { type } = require('os');

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

function createWindow () {
    const mainWindow = new BrowserWindow({
    title: 'Electron',
    width: 1000,
    height: 600,
    webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: path.join (__dirname, 'preload.js')
    }
})
__mainwindowid = mainWindow.id;

if (developerMode) {
    mainWindow.webContents.openDevTools();
    require('electron-reload')(__dirname, { 
        electron: path.join(__dirname, 'node_modules', '.bin', 'electron'), 
        hardResetMethod: 'exit'
    });
    const clientSrcPath = path.join(__dirname, 'client', 'src'); 
    require('chokidar').watch(clientSrcPath).on('all', (event, path) => {
    // Use mainWindow.reload() to reload the React app within the Electron window
    console.log('Waiting for React to finish compiling...');
    setTimeout(() => {
        console.log('React has finished compiling. Reloading Electron window...');
        mainWindow.reload();
    }, 5000);
    })
}


const startUrl = url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
});

mainWindow.loadURL('http://localhost:3000');
};

function createModal(parentWindow) {
    function createModal(parentWindow) {
        logDeveloperMode('Opening Modal Window...');
        if (parentWindow == undefined || parentWindow == null) {
            logDeveloperMode('Parent window not found');
            return null;
        }
    
        if (typeof parentWindow == 'string') {
            logDeveloperMode('Parent window is a string (an ID of a window)');
            parentWindow = BrowserWindow.fromId(Number(parentWindow));
        }
        const modalWindow = new BrowserWindow({
            parent: parentWindow,
            modal: true,
            webPreferences: {
                contextIsolation: true,
                nodeIntegration: true,
                preload: path.join(__dirname, 'preload.js')
            }
        });
        logDeveloperMode('Modal window created');
        return modalWindow;
    }
}

function settingModal(modalWindow, title) {
    if (typeof modalWindow !== 'object') {
        logDeveloperMode('Function settingModal : Modal window is not a BrowserWindow, but rather a ' + typeof modalWindow);
        return null;
    }
    logDeveloperMode('Function settingModal : Setting Modal Window Title...');
    modalWindow.setTitle(title);
    logDeveloperMode('Function settingModal : Setting Modal Window User Agent...');
    modalWindow.webContents.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36');
    logDeveloperMode('Function settingModal : Modal window user agent set to ' + modalWindow.webContents.getUserAgent());
    return modalWindow;
}

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

app.whenReady().then(createWindow);

ipcMain.on('open-login-window', (event, socialMedia) => {{
    if(developerMode)
    {
        console.log('Login window opened');
        console.log('Event \'open-login-window\' activated with parameter Social Media: ', socialMedia);
    }

    switch(socialMedia.toLowerCase())
    {
        case 'snapchat': // Case for Logging into Snapchat
            logDeveloperMode('Opening Snapchat Login Window...');
            // Create a modal window
            const modalWindow = createModal(BrowserWindow.fromId(event.sender.id));
            if(modalWindow == null)
            {
                logDeveloperMode('Modal window not created');
                return;
            }
            logDeveloperMode('Modal window created');
            logDeveloperMode(`Parent window ID: ${event.sender.id}`);
            // Set the modal window settings
            settingModal(modalWindow, 'Snapchat Login');
            logDeveloperMode('Logging Into Snapchat...');
            // Login to Snapchat
            Login(modalWindow, 'Snapchat', 'https://accounts.snapchat.com/v2/welcome');
}}});

ipcMain.on('login-success', (event, data) => {
    console.log('Received login success IPC message with:', data);
    // Handle the login success event here
});