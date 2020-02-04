require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
const app = express();

const { SESSION_SECRET } = process.env;

const allowedOrigins = ['http://localhost:3000', 'https://zurda.github.io'];

app.use(cors({
  credentials: true,
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      var msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      domain: 'https://zurda.github.io/',
      maxAge: 60000,
      sameSite: false,
    }
  })
);

module.exports = app 