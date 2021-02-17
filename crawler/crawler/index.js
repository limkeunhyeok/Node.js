const axios = require('axios');

function getCurrencyData(url) {
    return axios.get(url);
}

function extractor(data, name) {
    return {
        name: name,
        date: data[0].candleDateTime,
        openingPrice: data[0].openingPrice,
        highPrice: data[0].highPrice,
        lowPrice: data[0].lowPrice,
        tradePrice: data[0].tradePrice
    };
}

exports.getData = function(url) {
    return new Promise((resolve, reject) => {
        axios.all([getCurrencyData(url[0]), getCurrencyData(url[1]), getCurrencyData(url[2])])
            .then(axios.spread(function (btc, eth, xrp) {
                let result = [];
                result.push(extractor(btc.data, 'BTC'));
                result.push(extractor(eth.data, 'ETH'));
                result.push(extractor(xrp.data, 'XRP'));
                resolve(result);
            })).catch((err) => {
                reject(err);
            });
    });
}

// exports.getData = function(url1, url2, url3) {
//     return new Promise((resolve, reject) => {
//         axios.all([url1, url2, url3])
//             .then((result) => {
//                 resolve(result.data);
//             }).catch((err) => {
//                 reject(err);
//             });
//     });
// }