const Express = require('express');
const router = require('./routes/router');
const app = Express();

app.set('view engine', 'ejs');
app.set('/views', __dirname + '/views')

app.get('/', (req, res) => {
    res.render('index')
});

app.use('/upload', router);


app.listen(3000, () => {
    console.log('image upload test');
})