const parseString = require('xml2js').parseString;
const rp = require('request-promise');
let url =  "https://kr.investing.com/rss/news_301.rss"

const feed = {
    getData(req, res) {
        return new Promise((resolve, reject) => {
            rp(url)
                .then((res) => {
                    resolve(res);
                }).catch((err) => {
                    reject(err);
                })
        }).then((result) => {
            parseString(result, (err, obj) => {
                let items = obj.rss.channel[0].item;
                res.status(200).json(items);
            })
        }).catch((err) => {
            console.log(err);
        }) 
    }
};

module.exports = feed;