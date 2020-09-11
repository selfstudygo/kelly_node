const client = require('cheerio-httpcli');
const url = 'https://jpub.tistory.com';
const path = require('path');
const fs = require('fs');
const params = {};
const {Readable} = require('stream');
const downloadDir = path.resolve(__dirname, '../download');
if(!fs.existsSync(downloadDir)) {
  fs.mkdir(downloadDir);
}

client.fetch(url, params, (err, $, res)=>{
  if(err) {
    console.log('error: ', err.message);
    return
  }
  const body = $.html();
  const a = $('a').each((idx, el) => {
    console.log($(el).text(), new URL($(el).attr('href'), url).href)
   });
  const readStream = Readable.from(body);
  const writeStream = fs.createWriteStream(path.join(downloadDir, 'cheerio_test.html'));
  readStream.pipe(writeStream);
  readStream.on('end', ()=>{writeStream.close();console.log('end')})
});
