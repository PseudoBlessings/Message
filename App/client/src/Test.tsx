import React from 'react';

export default function Test() {
const ipcRenderer = (window as any).ipcRenderer;
function login (){
    console.log('login to snapchat');
    return ipcRenderer.openLoginWindow('snapchat');
}
    return (
    <div>
        <button onClick={login}>login to snapchat</button>
    </div>
    );
}