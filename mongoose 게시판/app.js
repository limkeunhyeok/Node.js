const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

const config = require('./config/config');
mongoose.connect(config.url, {useNewUrlParser: true,  useFindAndModify: false, useCreateIndex: true, useUnifiedTopology: true});
mongoose.connection.on('error', () => {
    console.error('MongoDB Connection Error.')
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('hello world!');
});

const index = require('./routes/index');
app.use('/board', index);

app.listen(3000, () => {
    console.log('Example App listening on Port 3000!!');
});