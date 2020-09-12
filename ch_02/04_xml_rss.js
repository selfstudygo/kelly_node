const rssUrl = 'http://www.kma.go.kr/weather/forecast/mid-term-rss3.jsp?stnId=109';
const parseString = require('xml2js').parseString;
const request = require('request');

const analyseRSS = (xml) => {
  parseString(xml, (err, obj) => {
    if ( err ) return;
    console.log(JSON.stringify(obj));
    const locations = obj.rss.channel[ 0 ].item[ 0 ].description[ 0 ].body[ 0 ].location;
    const data = locations.map((l) => {
      const city = l.city[ 0 ];
      const detail = l.data.map((d)=>{
        return `${d.tmEf} ${d.wf}(${d.tmx}~${d.tmn})`
      });
      return { city, detail: detail };
    });
    console.log(data);
  });
};

request(rssUrl, (err, res, body) => {
  if ( !err && res.statusCode === 200 ) {
    analyseRSS(body);
  }
});

