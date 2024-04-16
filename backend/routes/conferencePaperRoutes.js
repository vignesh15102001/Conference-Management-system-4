const express = require("express");
const router = express.Router();
const { listAll,addPaper ,addPaperReview,getPaper,sendPaper,listAllRecent} = require("../services/conferencePaperServices");

//Define routes
router.get("/listAll", listAll);
router.post("/addPaper",addPaper);
router.post("/editPaper",addPaperReview);
router.post("/getPaper",getPaper);
router.post("/sendPaper",sendPaper);
router.get("/listAllRecent", listAllRecent);
module.exports = router;