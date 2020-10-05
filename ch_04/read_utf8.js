const fs = require('fs');
const path = require('path');
const storeUrl = path.resolve(__dirname, '../download');

if(!fs.existsSync(storeUrl)){
  fs.mkdirSync(storeUrl);
}
// limited for type
const txt1 = fs.readFileSync(`${__dirname}/sample_utf8.txt`, 'utf-8');
console.log(txt1);
fs.writeFileSync(`${storeUrl}/fs_read_write_utf8.txt`, txt1);

const txt2 = fs.readFileSync(`${__dirname}/sample_utf8.txt`);
console.log(txt2);
fs.writeFileSync(`${storeUrl}/fs_read_write_buffer.txt`, txt2);
