const express = require("express");
const router = express.Router();
const { login,addUser, listAll } = require("../services/userServices");

// Define routes
router.post("/login", login);
router.post("/add", addUser);
router.get("/getAll",listAll)

module.exports = router;