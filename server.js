const express = require('express');
const app = express();
var mustache = require('mustache');
var engines = require('consolidate');

app.use(express.static(__dirname + './dist'));

app.set('views', __dirname + './dist');
app.engine('html', engines.mustache);
app.set('view engine', 'html');

app.route("/*").get((req, res) => {
    res.render('index.html');
});

app.listen(process.env.PORT || 8080, () => {
    console.log(`Aplicação ativa :D |http://localhost:${process.env.PORT || 8080}`);
});