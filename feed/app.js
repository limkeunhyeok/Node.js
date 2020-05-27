const Express = require("express");
const app = Express();
const bodyParser = require('body-parser');
const xml2jsRouter = require('./routes/xml2jsRouter');

app.set('view engine', 'ejs');
app.set('/views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render('index');
});

app.use('/xml2js', xml2jsRouter);

app.listen(3000, () => {
    console.log('web feed test');
});