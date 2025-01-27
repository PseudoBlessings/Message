
const {app,ipcMain, contextBridge, BrowserWindow, session} = require('electron');
const env = process.env.NODE_ENV || 'development';
const { logDeveloperMode } = require('./backend/utils/debug');
const { loadLoginPage, handleLoginPageLoad, handleNavigationEvent, Login } = require('./backend/utils/login');
__sourcereact = "Frontend\\client\\src"

const url = require('url');
const path = require('path');
const { type } = require('os');
const { log } = require('console');
const { create } = require('domain');
const db = require('../backend/database.js');

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

//finding 
function cssSelector(window, selector) {
    try{
        window.webContents.on('did-finish-load', async () => {
        const result = await window.webContents.executeJavaScript(`document.querySelector('${selector}')`);
        logDeveloperMode('Result of executeJavaScript:', result, 'for selector:', selector, 'on source:', source);
        return result;
        });
    }
    catch(error){
        console.error('Error executing JavaScript:', error);
        return null;
    }
}

function loadURL(window, url) {
    window.loadURL(url);
}

function createWindow (title = "New Window", width = 800, height = 600, contextIsolation = true, nodeIntegration = true, preload = 'preload.js', show = true, parent = null, modal = false) {
    const window = new BrowserWindow({
    parent: parent,
    modal: modal,
    title: title,
    width: width,
    height: height,
    show: show,
    webPreferences: {
        contextIsolation: true,
        nodeIntegration: true,
        preload: path.join (__dirname, 'preload.js')
    }
    });
    return window;
}

function createMainWindow () {
    const mainWindow = createWindow(title = 'Main Window');
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
    const startUrl = url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL('http://localhost:3000');
};

return window;
}

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
        const modalWindow = createWindow(title = 'Modal Window', parent = parentWindow, modal = true);
        logDeveloperMode('Modal window created');
        return modalWindow;
}

function uniqueAccountName(window = createWindow(show = false), url, selector) {
    try{
        if(url == window.webContents.getURL()){
        cssSelector(window, selector).then((result) => {
            if(result == null) {
                console.error('Error getting unique account name');
                return null;
            }
            else {
                console.log('Unique account name:', result);
                return result;
            }
        });
    }
    }
catch(error){
    console.error('Error getting unique account name:', error);
    return null;
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