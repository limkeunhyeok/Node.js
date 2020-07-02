const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes/index');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('/views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/', router);

app.listen(3000, () => {
    console.log('Example app listening on port 3000!!');
});
