require("dotenv").config();
const mongoose = require("mongoose");
const { sign } = require("jsonwebtoken");
const EntrySchema = require("../entry");
const UserSchema = require("../user");

const { DB_USER, DB_PASS, COOKIE_SECRET } = process.env;
const dbRoute = `mongodb://${DB_USER}:${DB_PASS}@ds149344.mlab.com:49344/coding-diary`;
const dbUsersRoute = `mongodb://${DB_USER}:${DB_PASS}@ds149414.mlab.com:49414/coding-diary-users`;

var dataConn = mongoose.createConnection(dbRoute);
var userConn = mongoose.createConnection(dbUsersRoute);

var User = userConn.model("User", UserSchema);
var Entry = dataConn.model("Entry", EntrySchema);

let db = mongoose.connection;

db.once("open", () => console.log("connected to the database"));
db.on("error", console.error.bind(console, "MongoDB connection error:"));



const getPosts = (req, res) => {
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
}


const updatePost = (req, res) => {
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
}

const deletePost = (req, res) => {
  const { id } = req.body;
  Entry.deleteOne({ _id: id }, (err, itemRemoved) => {
    if (err) return res.status(500).send(err);
    return res.json({ success: true, data: itemRemoved });
  });
}

const publishPost = (req, res) => {
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
}

const signup = (req, res, next) => {
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
}

const login = (req, res, next) => {
  const { logemail, logpassword } = req.body;
  if (req.body.logemail && req.body.logpassword) {
    User.authenticate(logemail, logpassword, (error, returnedUser) => {
      if (error || !returnedUser) {
        var err = new Error("Wrong email or password.");
        err.status = 401;
        return next(err);
      } else {
        req.session.userId = returnedUser._id;
        const token = sign(returnedUser.toJSON(), COOKIE_SECRET, {
          expiresIn: 604800
        });
        return res.status(200).send(token)
      }
    }
    );
  } else {
    var err = new Error("All fields required.");
    err.status = 400;
    return next(err);
  }
}

const logout = (req, res, next) => {
  req.session.userId = null;
  return res.status(200).send(null)
}

module.exports = {
  getPosts,
  updatePost,
  deletePost,
  publishPost,
  signup,
  logout,
  login
}