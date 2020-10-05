const client = require('cheerio-httpcli');
const urlUtil = require('url');
const fs = require('fs');
const path = require('path');

const LINK_LEVEL = 3;
const BASE_URL = 'https://nodejs.org/dist/latest-v12.x/docs/api/';
const list = {};

const checkSaveDir = (fname) => {
  const dirList = path.dirname(fname).split('/');
  let dir = '';
  for(const name of dirList) {
    dir += `${name}/`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  }
};

const downloadRec = (url, level) => {
  if (level >= LINK_LEVEL) return;
  if (list[url]) return;
  list[url] = true;
  if(!url.includes(BASE_URL)) return;
  client.fetch(url, {}, (err, $, res) => {
    $('a').each((idx, el)=>{
      let href = $(el).attr('href');
      if(!href) return;
      if(/^#/.test(href)) return;
      href = urlUtil.resolve(BASE_URL, href).replace(/#[^/#]+$/, '');
      if(!href.includes(BASE_URL)) return;
      console.log(href);
      downloadRec(href, level + 1);
    });
    let savePath = /\/$/.test(url)? `${url}/index.html` : url;
    savePath = `download/${savePath.split('/').slice(4).join('/')}`;
    checkSaveDir(savePath);
    fs.writeFileSync(savePath, $.html());
  })
};

downloadRec(BASE_URL, 0);

// fs.mkdir(path, cb)
// fs.mkdirSync(path, cb)
