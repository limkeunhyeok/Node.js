class Response {
    constructor (resultCode, resultMessage, resultValue) {
        this.resultCode = resultCode,
        this.resultMessage = resultMessage,
        this.resultValue = resultValue
        this.validation();
    };

    validation () {
        if (!(this.resultCode == 0 || this.resultCode == 1)) {
            throw new Error('result code is invaild');
        };
    };

    value () {
        return {
            resultCode: this.resultCode,
            resultMessage: this.resultMessage,
            resultValue: this.resultValue
        };
    };
};

module.exports = Response;