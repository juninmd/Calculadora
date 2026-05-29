import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import 'dotenv/config';

let win: BrowserWindow | null = null;

function createWindow() {
  win = new BrowserWindow({ width: 1000, height: 600 });

  if (process.env.PACKAGE === 'true') {
    win.loadURL(url.format({
      pathname: path.join(app.getAppPath(), 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  } else {
    win.loadURL(process.env.HOST as string);
  }

  win.maximize();

  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
