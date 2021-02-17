const mysql = require('mysql');

const DBHelper = function() {
    this.connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
    });
    this.connection.connect();
};

DBHelper.prototype.query = function(query, callback) {
    this.connection.query(query, function(err, results, fields) {
        callback(err, results, fields);
    });
};

module.exports = new DBHelper();