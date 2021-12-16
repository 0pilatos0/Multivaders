const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const url = require('url')
const path = require('path')
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        }
        // webPreferences: {
        //     // nodeIntegration: true,
        //     enableRemoteModule: true,
        // }
    })
    win.loadFile("../Client/index.html")
    // win.loadURL(`file://${__dirname}/../Client/index.html`);
}

// app.whenReady().then(() => {
//     createWindow()
// })
app.on('ready', () => {
    createWindow()
})

// app.whenReady().then(() => {
//     createWindow()
  
//     app.on('activate', () => {
//       if (BrowserWindow.getAllWindows().length === 0) createWindow()
//     })
// })

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})