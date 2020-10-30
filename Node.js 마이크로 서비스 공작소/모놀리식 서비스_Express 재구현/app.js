const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const members = require('./routes/members');
const goods = require('./routes/goods');
const purchases = require('./routes/purchases');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.status(200).send("hello world");
})

app.use('/members', members);
app.use('/goods', goods);
app.use('/purchases', purchases);

app.use(function(req, res, next) {
    res.status(404).end();
});

app.listen(8000, () => {
    console.log("모놀리식 서비스_Express");
});