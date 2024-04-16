const express = require("express");
const router = express.Router();
const { addQuery, listAll } = require("../services/queryServices");

// Define routes

router.post("/add", addQuery);
router.get("/getAll",listAll)

module.exports = router;