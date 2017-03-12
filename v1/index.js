const { app } = require("electron");
const { BrowserWindow } = require("electron");

app.on('ready', () => {
    var mainWindow = new BrowserWindow({
        width: 800,
        height: 600
    });
    mainWindow.loadURL(`file://${__dirname}/app/index.html`)
})