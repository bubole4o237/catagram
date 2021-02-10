const express = require('express');
const url = require('url');

const app = express();
const port = 5000;

const checkInputName = require('./middlewares/middleware');

app.get('/info/:name', checkInputName, (req, res) => {
    console.log(url.parse(req.url).path);
    console.log(req.params);
    // res.status(200).send(`You are looking about the cat ${req.params.name}!`);
    // console.dir(res);
    // res.json({name: 'rex', age: 3, weight: 12});
    res.send(`The name you are looking for is: ${req.params.name.toUpperCase()}`);
});

app.get('/download', (req, res) => {
    console.log(__dirname);
    res.sendFile(__dirname + '/views/index.html');
;});

app.post('/ca*ts', (req, res) => {
    console.log('Create cat.');
    res.status(201);
    res.send('Cat created successfully!');
});
 
app.all('/', (req, res) => {
    console.log(req.method);
    console.log('Handle all requests.');
    res.send('Here come all methods on main route.' + `The request method is: ${req.method}`);
});

app.listen(port, () => console.log(`Server is running on port ${port}...`));
