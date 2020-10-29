const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const compression = require('compression');
const indexRouter = require('./routes/indexRouter');
const topicRouter = require('./routes/topicRouter');
const authRouter = require('./routes/authRouter');
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const app = express();

app.use(helmet());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(compression());

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}))

app.get('*', (req, res, next) => {
    fs.readdir('./data', (err, files) => {
        req.list = files;
        next();
    });
});

app.use('/', indexRouter);
app.use('/topic', topicRouter);
app.use('/auth', authRouter);

app.use((req, res, next) => {
    res.status(404).send('Sorry cant find that!');
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!!');
});