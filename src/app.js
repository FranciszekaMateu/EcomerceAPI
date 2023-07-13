const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const path = require('path');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');

app.use(express.json())
app.use(cookieParser());

app.set("auth", false);
app.set("user", "");
app.use(express.urlencoded({ extended: true }));
app.use('/virtual', express.static(__dirname + '/public'));


app.set('view engine', 'handlebars');
app.engine('handlebars', handlebars.engine());
app.use("/api", router);
app.set('views', "./views");


module.exports = app;




