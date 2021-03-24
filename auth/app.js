const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const fs = require('fs');
const compression = require('compression');
const app = express();
const Response = require('./response/response');
const RESPONSE_CODE = require('./response/responseCode');
const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topic');

app.use(helmet());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.get('*', (req, res, next) => {
    fs.readdir('./data', (err, files) => {
        req.list = files;
        next();
    });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

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