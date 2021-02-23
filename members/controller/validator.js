// 참고 사이트 https://js.plainenglish.io/getting-started-with-express-validator-fae0bbeeb0f9

const {check, validationResult} = require('express-validator');

exports.email = [
    check('email')
        .isEmail()
        .withMessage('Invalid email')
        .normalizeEmail(),
    function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors});
        } else {
            console.log('Email validation complete!');
            next();
        }
    }
]

exports.password = [
    check('password')
        .isLength({ min: 8, max: 15 })
        .withMessage("your password should have min and max length between 8-15"),
    function(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors});
        } else {
            console.log('Password validation complete!')
            next()
        }
    }
]