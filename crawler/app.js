require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const index = require('./routes/index');
app.use('/', index);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});