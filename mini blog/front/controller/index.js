const axios = require("axios");

function request(option) {
  return new Promise((resolve, reject) => {
    axios(option)
      .then((results) => {
        resolve(results);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function Service(baseurl) {
  this.url = baseurl;
}

Service.prototype.request = async function (id, method, data) {
  const option = {
    url: this.url + id,
    method,
    data,
  };
  try {
    const res = await request(option);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

module.exports = Service;
