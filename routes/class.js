const express = require("express");
const withAuth = require("../middlewares/withAuth");
const ClassesController = require('../controllers/Classes');
const router = express.Router();

router.post("/create", withAuth, ClassesController.create);

router.post("/add-member", withAuth, ClassesController.addMember);

router.post("/add-class", withAuth, ClassesController.addClass);

router.post("/join-by-code", withAuth, ClassesController.joinBycode);

router.get("/all", withAuth, ClassesController.classesByTeacher);

router.get("/:id", withAuth, ClassesController.getClass);

module.exports = router;
