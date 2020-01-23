require("dotenv").config();
const mongoose = require("mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
var session = require("express-session");
const cookieParser = require("cookie-parser");
const { sign, verify } = require("jsonwebtoken");
const EntrySchema = require("./entry");
const UserSchema = require("./user");
const cors = require("cors");

// long poling: using the http protocol to its limits
// websockets: dedicated protocol for bidirectional communication

const app = express();
const router = express.Router();

const { DB_USER, DB_PASS } = process.env;
const dbRoute = `mongodb://${DB_USER}:${DB_PASS}@ds149344.mlab.com:49344/coding-diary`;
const dbUsersRoute = `mongodb://${DB_USER}:${DB_PASS}@ds149414.mlab.com:49414/coding-diary-users`;

var dataConn = mongoose.createConnection(dbRoute);
var userConn = mongoose.createConnection(dbUsersRoute);

var User = userConn.model("User", UserSchema);
var Entry = dataConn.model("Entry", EntrySchema);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));

db.on("error", console.error.bind(console, "MongoDB connection error:"));

const cookieSecret = "charlie!";

app.use(cors({ credentials: true, origin: "https://zurda.github.io" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));
app.use(cookieParser(cookieSecret));
app.use(
  session({
    secret: "work hard",
    resave: true,
    saveUninitialized: false
  })
);

router.get("/entries", (req, res) => {
  if (req.session.userId) {
    Entry.find((err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  } else {
    Entry.find({ isPublic: true }, (err, data) => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true, data: data });
    });
  }
});

router.post("/updateData", (req, res) => {
  const { _id, title, message, code, originUrl, labels, isPublic } = req.body;
  Entry.findByIdAndUpdate(
    _id,
    { $set: { title, message, code, originUrl, labels, isPublic } },
    { new: true },
    (err, result) => {
      if (err) return res.status(500).send(err);
      return res.json({ success: true, data: result });
    }
  );
});

router.delete("/entry", (req, res) => {
  const { id } = req.body;
  Entry.deleteOne({ _id: id }, (err, itemRemoved) => {
    if (err) return res.status(500).send(err);
    return res.json({ success: true, data: itemRemoved });
  });
});

router.post("/putData", (req, res) => {
  let data = new Entry();
  const { title, message, code, originUrl, labels, isPublic } = req.body;

  if (!message || !title) {
    return res.json({
      success: false,
      error: "INVALID INPUTS"
    });
  }
  data.title = title;
  data.message = message;
  data.code = code;
  data.originUrl = originUrl;
  data.labels = labels;
  data.isPublic = isPublic === "public";
  data.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/putUser", (req, res, next) => {
  let user = new User();
  const { email, username, password, passwordConf } = req.body;
  if (email && username && password && passwordConf) {
    user.email = email;
    user.username = username;
    user.password = password;
    user.passwordConf = passwordConf;
    user.save(err => {
      if (err) return res.json({ success: false, error: err });
      return res.json({ success: true });
    });
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

router.post("/loginUser", (req, res, next) => {
  if (req.body.logemail && req.body.logpassword) {
    User.authenticate(
      req.body.logemail,
      req.body.logpassword,
      (error, returnedUser) => {
        if (error || !returnedUser) {
          var err = new Error("Wrong email or password.");
          err.status = 401;
          return next(err);
        } else {
          req.session.userId = returnedUser._id;
          console.log("user id in session", req.session.userId);
          const token = sign(returnedUser.toJSON(), cookieSecret, {
            expiresIn: 604800
          });
          return res.status(200).cookie("auth", token).json({ success: true });
        }
      }
    );
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
});

app.use("/api", router);

app.listen(process.env.PORT || 5000, () =>
  console.log(`LISTENING ON PORT 5000`)
);