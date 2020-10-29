const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const compression = require('compression');
const helmet = require('helmet');
const indexRouter = require('./routes/index');
const topicRouter = require('./routes/topic');
const app = express();

app.use(helmet()); // 보안 관련 이슈를 자동으로 해결

app.use(express.static('public')); // 정적 데이터 사용
app.use(bodyParser.urlencoded({ extended: false})); // qs를 해석
app.use(compression()); // 전송되는 데이터를 압축
// 미들웨어 생성
// 모든 요청에 대해 req.list는 data폴더의 파일들을 명시한다.
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
    res.status(404).send('Sorry cant find that!');
});


// 존재하지 않는 data 디렉토리에 접근했을 때의 에러처리
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});