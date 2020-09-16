const TargetUrl = 'https://ko.wikipedia.org/';

const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const size = {width: 1100, height: 800}
function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    ...size,
    webPreferences: {
      nodeIntegration: true
    }
  });

  // and load the index.html of the app.
  // win.loadURL(TargetUrl)
  win.loadFile(path.resolve(__dirname, 'index1.html'));
}

function createIpcWindow(){
  /* Event handler for asynchronous incoming messages */
  ipcMain.on('sync-mul', (e, d)=>{
    e.returnValue = d.a * d.b;
  });
  ipcMain.on('async-mul', (e, d) => {
    e.reply('async-mul-res', {data: d.a *d.b });
  });
  const win = new BrowserWindow({
    ...size,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win.loadFile(path.resolve(__dirname, 'index2.html'));
}

app.whenReady().then(()=>{
  createWindow();
  createIpcWindow();
});


//https://www.electronjs.org/docs/api/browser-window
