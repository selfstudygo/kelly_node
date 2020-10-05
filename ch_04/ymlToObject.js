const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');
const {Readable} =require('stream');
const downloadDir = path.resolve(__dirname, "../download");

const txt = fs.readFileSync(`${__dirname}/.eslintrc.yml`, 'utf-8');
if (!fs.existsSync(downloadDir)) {
  fs.mkdirSync(downloadDir, { recursive: true });
}

const obj= yaml.safeLoad(txt);
const readStream = Readable.from(JSON.stringify(obj, null, 2));
const writeStream = fs.createWriteStream(
    path.join(downloadDir, ".eslintrc.json")
);
readStream.pipe(writeStream);
readStream.on("end", () => {
writeStream.close();
console.log("end");
});