// phantomjs is no longer maintained
const puppeteer = require('puppeteer');
const keys = require('../.private_keys/naver');
const fs = require('fs');
const path = require('path');

const USER_AGENT = {
  iphoneX: 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1',
  chrome: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
};

if(!fs.existsSync('download')) {
  fs.mkdir('download');
}

/*
* setViewport
* width: pixels. required
* height: pixels. required
* deviceScaleFactor Defaults to 1.
* isMobile: boolean
* hasTouch: boolean
* isLandscape: boolean
* */
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const pageUrl = 'https://nid.naver.com/nidlogin.login';
  const userAgent = USER_AGENT.chrome;
  await page.setUserAgent(userAgent);
  await page.goto(pageUrl);
  await page.evaluate((id, pw) => {
    document.querySelector('#id').value = id;
    document.querySelector('#pw').value = pw;
  }, keys.id, keys.pw);

  await page.click('.btn_global');
  await page.waitForNavigation();

  await page.goto('https://naver.com');

  await page.screenshot({ path: path.resolve(__dirname, '../download', 'naver.png'), fullPage: true });

  await browser.close();
})();
