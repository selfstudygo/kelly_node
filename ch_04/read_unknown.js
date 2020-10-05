const fs = require('fs');
const { Iconv } = require('iconv');
const jschardet = require('jschardet');

const buf = fs.readFileSync(`${__dirname}/sample_euckr.txt`);

const det = jschardet.detect(buf);
console.log(det); 
// { encoding: 'EUC-KR', confidence: 0.99 }

const iconv = new Iconv(det.encoding, 'utf-8');
const buf2 = iconv.convert(buf);
const txt=buf2.toString('utf-8');
console.log(txt);
