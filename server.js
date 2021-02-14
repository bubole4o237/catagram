const express = require('express');
const url = require('url');

const app = express();
const port = 5000;
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

const checkInputName = require('./middlewares/middleware');
const logger = require('./middlewares/logger');
const catsObj = require('./cats');

app.use('/static', express.static('public'));
app.use(logger);

app.use(bodyParser.urlencoded({extended: false}));

app.engine('hbs', handlebars({
    extname: 'hbs'
}));
app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    let name = 'Iavor';
    res.render('home', { name });
});

app.get('/info/:name', checkInputName, (req, res) => {
    // console.log(url.parse(req.url).path);
    console.log(req.params.name);
    console.log(req.originalUrl.split('/')[1]);
    // console.log(req.originalUrl.split('/')[2]);
    // res.status(200).send(`You are looking about the cat ${req.params.name}!`);
    // console.dir(res);
    // res.json({name: 'rex', age: 3, weight: 12});
    res.send(`The name you are looking for is: ${req.params.name.toUpperCase()}`);
});

app.get('/download', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/views/home.html');
    ;
});

app.get('/cats', (req, res) => {
    res.render('cats', {collectionCats: catsObj.getAll()});
})

app.post('/cats', (req, res) => {
    let catName = req.body.cat;
    catsObj.add(catName);
    console.log('Create cat.');
    res.redirect('/cats');
});
 
app.all('/', (req, res) => {
    console.log(req.method);
    console.log('Handle all requests.');
    res.send('Here come all methods on main route.' + `The request method is: ${req.method}`);
});

app.listen(port, () => console.log(`Server is running on port ${port}...`));
