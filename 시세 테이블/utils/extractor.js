module.exports = {
    extraction: (apiData) => {
        let result = [];
        for(var i = 0; i < apiData.length; i++) {
            let temp = {};
            temp.code = apiData[i].data[0].code.split('-')[1];
            temp.openingPrice = apiData[i].data[0].openingPrice;
            temp.highPrice = apiData[i].data[0].highPrice;
            temp.lowPrice = apiData[i].data[0].lowPrice;
            temp.tradePrice = apiData[i].data[0].tradePrice;
            result.push(temp);
        };
        return result
    }
};
