const client = require('cheerio-httpcli');
const urlUtil = require('url');
const request = require('request');
const fs = require('fs');
const path = require('path');
const { Readable } = require('stream');

const url = `https://ko.wikipedia.org/wiki/${encodeURIComponent('강아지')}`;
const downloadDir = path.resolve(__dirname, '../download');
const saveDir = path.resolve(downloadDir, 'img');

if ( !fs.existsSync(downloadDir) ) {
  fs.mkdirSync(downloadDir);
}
if ( !fs.existsSync(saveDir) ) {
  fs.mkdirSync(saveDir);
}

let i = 0;
client.fetch(url, {}, (err, $, res) => {
  const images = $('img');
  const imageArr = [];
  images.each((i, el) => {
    let src = $(el).attr('src');
    src = urlUtil.resolve(url, src);
    imageArr.push(src);
    let fname = `${saveDir}/${urlUtil.parse(src).pathname.replace(/[^a-zA-Z0-9.]/g, '_')}`;
    const writeStream = fs.createWriteStream(fname);
    request(src).pipe(writeStream);
  });

  Readable.from(imageArr.join('\n')).pipe(fs.createWriteStream(`${saveDir}/list.txt`))
});

// fs.existsSync
// fs.mkdirSync
// url
