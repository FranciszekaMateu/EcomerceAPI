const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');

app.set("auth", false);
app.set("user", "");
app.use(express.urlencoded({ extended: true }));
app.use('/virtual', express.static(__dirname + '/public'));

const session = require('express-session');
const FileStore = require('session-file-store');

app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine());
app.set('views', "./views");

module.exports = app;



