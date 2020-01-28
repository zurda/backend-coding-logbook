const express = require("express");
const router = express.Router();
const { getPosts, updatePost, deletePost, publishPost, signup, login, logout } = require('./coontrollers')

router.get("/entries", getPosts);
router.post("/updateData", updatePost);
router.delete("/entry", deletePost);
router.post("/putData", publishPost);
router.post("/putUser", signup);
router.post("/loginUser", login);
router.post("/logoutUser", logout);

module.exports = router 
