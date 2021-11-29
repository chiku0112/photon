const express = require("express");
const withAuth = require("../middlewares/withAuth");
const SubmittionController = require('../controllers/Submittion');
const router = express.Router();

router.post("/submit", withAuth, SubmittionController.submit);

module.exports = router;
