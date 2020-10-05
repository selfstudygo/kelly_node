const fs = require('fs');
const path = require('path');

const storeUrl = path.resolve(__dirname, '../download');

const {Iconv} = require('iconv');
const euckrToUtf8 = new Iconv('euc-kr', 'utf-8');

if(!fs.existsSync(storeUrl)){
  fs.mkdirSync(storeUrl);
}

const euckrBuf = fs.readFileSync(`${__dirname}/sample_euckr.txt`);
const utf8Buf = euckrToUtf8.convert(euckrBuf);
const utf8 = utf8Buf.toString('utf-8');

fs.writeFileSync(`${storeUrl}/fs_read_write_euckr.txt`, utf8);

