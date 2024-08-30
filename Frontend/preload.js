const { contextBridge, ipcRenderer} = require('electron');

const os = require('os');

contextBridge.exposeInMainWorld('electron', {
    homeDir: () => os.homedir()
})

contextBridge.exposeInMainWorld('ipcRenderer',{
    openNewWindow: (url, title) => {
        console.log('Sending open-login-window IPC message with:', url, title);
        ipcRenderer.send('open-new-window', url, title);
    }
})