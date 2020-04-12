const axios = require('axios');
const Response = require('../response/response');
const RESPONSE_CODE = require('../response/responseCode');
const extractor = require('../utils/extractor');


class APIcontroller {
    getPrices (req, res, next) {
        return new Promise((resolve, reject) => {
            axios.all([
                axios.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-BTC'),
                axios.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-ETH'),
                axios.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-XRP'),
                axios.get('https://crix-api-endpoint.upbit.com/v1/crix/candles/days/?code=CRIX.UPBIT.KRW-EOS')
            ]).then((result) => {
                resolve(result);
            }).catch((err) => {
                reject(err);
            })
        }).then((result) => {
            let allData = extractor.extraction(result);
            res.status(200).json((new Response(RESPONSE_CODE.SUCCESS, 'Request success', allData).value()));
            return allData
        }).catch((err) => {
            err.status = 500;
            next(err);
            console.log(err);
            // res.status(500).json((new Response(RESPONSE_CODE.FAIL, 'Request failed', err).value()));
        });
    };
};

module.exports = new APIcontroller();



