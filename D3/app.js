const fs = require('fs');
const Express = require('express');
const app = Express();

app.use('/d3', Express.static(__dirname + '/d3'));

app.set('view engine', 'ejs');
app.set('views', './views')


app.get('/', (req, res) => {
    res.render('index');
});

app.get('/FTSE.csv', (req, res) => {
    fs.readFile('./views/FTSE.csv', 'utf8', (err, data) => {
        if (err) {
            console.log(err)
        }
        res.status(200).send(data);
    });
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});