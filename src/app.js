const express = require('express');
const app = express();
const path = require('path');
const router = require('./routes/index');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcrypt');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const {url} = require("./config/config")
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
      secret: 'mi_secreto', 
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 24 * 60 * 60 * 1000, 
      },
      store: MongoStore.create({
        mongoUrl: url, 
        mongoOptions: {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        },
      })
    })
  );
app.set("auth", false);
app.set("user", "");
app.use(express.urlencoded({ extended: true }));
app.use('/virtual', express.static(__dirname + '/public'));

app.use("/api", router);



module.exports = app;





