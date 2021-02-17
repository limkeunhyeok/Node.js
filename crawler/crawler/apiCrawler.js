const crawler = require('./index');
const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');
const DBHelper = require('../models/dbHelper');
const schedule = require('node-schedule');

const url1 = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-BTC&count=1';
const url2 = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-ETH&count=1';
const url3 = 'https://crix-api-endpoint.upbit.com/v1/crix/candles/minutes/1?code=CRIX.UPBIT.KRW-XRP&count=1';

const apiCrawler = function() {
    this.active = false;
}

apiCrawler.prototype.start = function(req, res) {
    console.log('start!');
    if (this.active) {
        return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Already Running', null));
    }
    
    try {
        this.active = true
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
                    }
                )
            })
        })
        res.send(new Response(RESPONSE_CODE.SUCCESS, 'Running Successfully', null));
    } catch (error) {
        return res.send(new Response(RESPONSE_CODE.FAIL, 'Crawler Failed', error));
    }
}

apiCrawler.prototype.stop = function(req, res) {
    if (!this.active) {
        return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Already Running', null));
    }
    try {
        console.log('stop!!');
        this.active = false;
        schedule.cancelJob('apiCrawler');
        return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Stopped Successfully', null));
    } catch (error) {
        return res.send(new Response(RESPONSE_CODE.FAIL, 'Crawler Failed', error));
    }
}

apiCrawler.prototype.stat = function(req, res) {
    try {
        let message = 'Crawler stopped';
        if (this.active) {
            message = 'Crawler running';
        }
        return res.send(new Response(RESPONSE_CODE.SUCCESS, 'Stat', message));
    } catch (error) {
        return res.send(new Response(RESPONSE_CODE.FAIL, 'Crawler Failed', error));
    }
}

module.exports = new apiCrawler;