const rssUrl = 'http://www.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109';
const client = require('cheerio-httpcli');

client.fetch(rssUrl, {}, (err, $, res) => {
  const data = [];
  $('location').each((i, el)=>{
    const city = $(el).find('city').eq(0).text();
    const detail =[];
    $(el).find('data').each((i, d)=> {
      const t = $(d);
      detail.push( `${t.find('tmEf').text()} ${t.find('wf').text()} (${t.find('tmx').text()}~${t.find('tmn').text()})`);
    });
    return data.push({city, detail})
  });
  console.log(data);
});

