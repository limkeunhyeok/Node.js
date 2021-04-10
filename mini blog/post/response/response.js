const Response = function (code, message, value) {
  if (!(code === 0 || code === 1)) {
    throw Error("Result code is invalid");
  }

  this.code = code;
  this.message = message;
  this.value = value;
};
  
module.exports = Response;