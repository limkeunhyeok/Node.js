const crawler = require('./index');
const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');
const DBHelper = require('../models/dbHelper');
const schedule = require('node-schedule');

const url1 = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-BTC&count=1';
const url2 = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-ETH&count=1';
const url3 = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-XRP&count=1';

const apiCrawler = {}

// apiCrawler.start = async function(req, res) {
//     console.log('start!');
//     let currencyData = await crawler.getData([url1, url2, url3]);
//     console.log(currencyData);
//     currencyData.forEach(data => {
//         DBHelper.query(
//             `INSERT INTO currency (name, date, openingPrice, highPrice, lowPrice, tradePrice) VALUES ('${data.name}', '${data.date}', ${data.openingPrice}, ${data.highPrice}, ${data.lowPrice}, ${data.tradePrice});`,
//             function(err, results, fields) {
//                 if (err) {
//                     console.log(err)
//                 }
//         })
//     })
//     return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Running Successfully', currencyData));
// }

apiCrawler.start = function(req, res) {
    console.log('start!');
    schedule.scheduleJob('apiCrawler', '0 */1 * * * *', async function() {
        let currencyData = await crawler.getData([url1, url2, url3]);
        console.log(currencyData);
        currencyData.forEach(data => {
            DBHelper.query(
                `INSERT INTO currency (name, date, openingPrice, highPrice, lowPrice, tradePrice) VALUES ('${data.name}', '${data.date}', ${data.openingPrice}, ${data.highPrice}, ${data.lowPrice}, ${data.tradePrice});`,
                function(err, results, fields) {
                    if (err) {
                        console.log(err)
                    }
            })
        })
        res.send(new Response(RESPONSE_CODE.SUCCESS, 'Running Successfully', null));
    })
}

apiCrawler.stop = function() {
    console.log('stop!!');
    schedule.cancelJob('apiCrawler');
    return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Stopped Successfully', null));
}
apiCrawler.stat = function() {}

module.exports = apiCrawler;