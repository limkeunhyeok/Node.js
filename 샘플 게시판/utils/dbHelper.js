const mysql = require('mysql');

class DBHelper {
    constructor() {
        this.connection = mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME
        });

        this.connection.connect();
        
    };

    query (query, callback) {
        this.connection.query(query, function(error, results, fields){
            callback(error, results, fields);
        });
    };
};

module.exports = new DBHelper();