const TARGET_URL= 'https://finance.naver.com/';
const { app, BrowserWindow } = require('electron');
const path = require('path');
const fs = require('fs');

if(!fs.existsSync('download')) {
  fs.mkdirSync('download');
}

const getScreenshot = ()=>{
  const win = new BrowserWindow({width: 1100, height: 780});
  win.loadURL(TARGET_URL);
  const t = new Date();
  const fileName = `financial_${t.getFullYear()}_${t.getMonth()+1}_${t.getDate()}.png`;
  win.webContents.on('did-finish-load', ()=>{
    win.webContents.capturePage().then(img => {
      fs.writeFileSync(path.resolve(__dirname, '../download', fileName), img.toPNG());
      app.quit();
    })
  });
};

app.whenReady().then(()=>{
  getScreenshot();
});
