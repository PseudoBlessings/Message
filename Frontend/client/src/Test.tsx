import React from 'react';

export default function Test() {
const ipcRenderer = (window as any).ipcRenderer;
function login (){
    console.log('login to snapchat');
    return ipcRenderer.openNewWindow('https://accounts.snapchat.com/accounts/v2/login?', 'snapchat');
}
    return (
    <div>
        <button onClick={login}>login to snapchat</button>
    </div>
    );
}