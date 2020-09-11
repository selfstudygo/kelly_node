const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = 'https://jpub.tistory.com/';
const downloadDir = path.resolve(__dirname, '../download');
if(!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir);
}
const savePath = `${downloadDir}/test.html`;
// const writeStream = fs.createWriteStream(savePath);
// https.get(url, (res)=>{
//   res.pipe(writeStream);
//   res.on('end', ()=>{
//     writeStream.close();
//     console.log('end')
//   })
// });

const downloadFile = (from, to, cb) => {
  const writeStream = fs.createWriteStream(to);
  const client = /^https/.test(from) ? https : http;
  client.get(from, (res)=> {
    res.pipe(writeStream);
    res.on('end', ()=>{
      cb();
    })
  })
}

downloadFile(url, savePath, ()=> console.log('done'));
