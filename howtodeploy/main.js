// ./main.js
const { app, BrowserWindow } = require('electron')
const path = require('path');
const url = require('url');

let win = null;

app.on('ready', function () {

  // Initialize the window to our specified dimensions
  win = new BrowserWindow({ width: 1000, height: 600 });

  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));

  win.maximize();
  //win.setMenu(null);

  // Remove window once app is closed
  win.on('closed', function () {
    win = null;
  });

});

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})

app.on('window-all-closed', function () {
  if (process.platform != 'darwin') {
    app.quit();
  }
});