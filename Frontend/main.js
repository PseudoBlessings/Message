const {app,ipcMain, contextBridge, BrowserWindow} = require('electron');
const env = process.env.NODE_ENV || 'development';
__sourcereact = "Frontend\\client\\src"

const url = require('url');
const path = require('path');

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

if (env === 'development') {
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

app.whenReady().then(createWindow);

function loginWindow (url, title) {
    console.log('Opening login window...');
    console.log('loginWindow called with:', url, title);

    const loginWindow = new BrowserWindow({
        title: title,
        width: 600,
        height: 600,
        webPreferences: {
            contextIsolation: true,
            nodeIntegration: true,
            preload: path.join (__dirname, 'preload.js')
        }
    })
    loginWindow.loadURL(url);
};

ipcMain.on('open-new-window', (event, url, title) => {
    console.log('Received open-login-window IPC message with:', url, title);
    loginWindow(url, title);  // Call your function to open the login window
});