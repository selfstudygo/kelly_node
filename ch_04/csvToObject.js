const CSV = require('comma-separated-values');
const path = require('path');
const fs = require('fs');
const {Readable} = require('stream');
const jschardet = require('jschardet');
const {Iconv} = require('iconv');
const savePath = path.resolve(__dirname, '..', 'download');
if (!fs.existsSync(savePath)) {
  fs.mkdirSync(savePath, {recursive: true});
}

const fileUrl = path.resolve(__dirname, 'bids_sample_mrpab.csv');
const buf = fs.readFileSync(fileUrl);
const det = jschardet.detect(buf);
const text = new Iconv(det.encoding, 'utf-8').convert(buf).toString('utf-8');
const csv = new CSV(text, {header: true});
const obj = csv.parse();

console.log(obj);

const writeStream = fs.createWriteStream(path.resolve(process.cwd(), 'download', 'bids_sample_mrpab.json'));
const readStream = Readable.from(JSON.stringify(obj, null, 2));
  readStream.pipe(writeStream);
  readStream.on('end', ()=>{
    writeStream.close();
    console.log('end');
  });





