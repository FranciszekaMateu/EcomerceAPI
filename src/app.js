const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');

app.use(express.json());
app.use(cookieParser());

app.set("auth", false);
app.set("user", "");
app.use(express.urlencoded({ extended: true }));
app.use('/virtual', express.static(__dirname + '/public'));

app.use("/api", router);

const salt = bcrypt.genSaltSync(10);
const hash = bcrypt.hashSync("admincoder", salt);
console.log(hash);

module.exports = app;





