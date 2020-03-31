const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const log4js = require('log4js');
const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topic');
const template = require('./lib/template');
const app = express();
log4js.configure(__dirname + '/config/log_config.json');

const log = log4js.getLogger('app')


app.use(helmet());
app.use(log4js.connectLogger(log4js.getLogger('http'), {level: "auto"}));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));
app.use(compression());

app.get('*', (req, res, next) => {
    fs.readdir('./data', (err, files) => {
        req.list = files;
        next();
    });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);

// 존재하지 않는 페이지에 접근했을 때의 에러처리
// 모든 미들웨어를 순차적으로 거쳐 아무것도 발견되지 않았을 때 실행
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err)
    // res.status(404).send('Sorry cant find that!');
});


app.use((err, req, res, next) => {
    log.error("Something went wrong:", err);
    res.status(err.status || 500);
    let html = template.err(err.message, err.status, err.stack)
    res.send(html);
});

// 존재하지 않는 data 디렉토리에 접근했을 때의 에러처리
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
// });


app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});