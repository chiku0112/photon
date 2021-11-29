const express = require("express");
const withAuth = require("../middlewares/withAuth");
const AssignmentController = require('../controllers/Assignment');
const router = express.Router();

router.post("/create", withAuth, AssignmentController.create);
router.post("/book", withAuth, AssignmentController.book);

router.get("/all", withAuth, AssignmentController.assignmentsByTeacher);

module.exports = router;
