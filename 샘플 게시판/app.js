require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const compression = require('compression');
const expressLayouts = require('express-ejs-layouts');
const contentsRouter = require("./router/contents");

const app = new express();

app.use(helmet()); // 보안 이슈 자동으로 해결

// 경로 설정
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

// ejs 설정
app.set('view engine', 'ejs');
app.set('views', [
    path.join(__dirname, '/views/page'),
    path.join(__dirname, '/views/partials')
]);

// layout 설정
app.set('layout', 'layout');
app.use(expressLayouts);

// qs 분석
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(compression()); // 전송되는 데이터 압축

app.get('/', (req, res, next) => {
    res.render('index.ejs', {title: "index"})
    next();
});

app.use('/contents', contentsRouter);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});

