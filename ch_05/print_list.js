const client = require('cheerio-httpcli');
const fs = require('fs');
const urlUtil = require('url');

const postList = [];
const getUrl = (keyword, pageNo) => `https://jpub.tistory.com/search/${encodeURIComponent(keyword)}`
  //`https://section.blog.naver.com/Search/Post.nhn?pageNo=${pageNo}&rangeType=ALL&orderBy=sim&keyword=${keyword}`;

const scrape = (k, PN, maxPN) => {
  if (maxPN === undefined) {
    maxPN = PN;
  }
  if (PN > maxPN) {
    print();
    return;
  }
  const url = getUrl(k, PN);
  client.fetch(url, (err, $, res) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log($.html())
    const tr = $('.list_search_post');
    if(!tr || !tr.length) {
      console.log('no content!')
      return;
    }
    const arr = tr.each((i, item) => {
      console.log(item);
    })
  });
};

scrape('react', 1);
