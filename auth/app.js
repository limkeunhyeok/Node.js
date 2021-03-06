const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();
const Response = require('./response/response');
const RESPONSE_CODE = require('./response/responseCode');
const auth = require('./routes/index');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', auth);

app.use((req, res, next) => {
    let err = new Response(RESPONSE_CODE.SUCCESS, 'Not Found!', null);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    console.log('-------------')
    console.log(err);
    res.status(err.status || 500).json(err);
})

app.listen(3010, () => {
    console.log('Example app listening on port 3010!');
});