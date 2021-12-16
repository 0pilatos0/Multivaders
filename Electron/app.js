const { app, BrowserWindow } = require('electron')

const createWindow = () => {
    const { width, height } = require('electron').screen.getPrimaryDisplay().workAreaSize
    const win = new BrowserWindow({
        width: width,
        height: height,
        autoHideMenuBar: true,
        icon: '../Client/icon.png'
    })
    win.maximize()
    win.loadFile("../Client/index.html")
}

app.on('ready', () => {
    createWindow()
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})