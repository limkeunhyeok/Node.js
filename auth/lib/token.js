const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');

exports.createToken = function(payload) {
    console.log(secret);
    return new Promise((resolve, reject) => {
        jwt.sign(payload, secret, {
            expiresIn: '7d'
        }, (error, token) => {
            if (error) reject(error);
            resolve(token);
        })
    })
}