function response() {
    this.errorCode = 0;
    this.errorMessage = '';
    this.result = null;
};

response.prototype.code = function(num) {
    this.errorCode = num;
    return this;
};

response.prototype.message = function(msg) {
    this.errorMessage = msg;
    return this;
};

response.prototype.results = function(result) {
    this.result = result;
    return this;
}

module.exports = response;