const Assignment = require("../models/Assignment.js");
const User = require("../models/User.js");

module.exports = {
    create: function (req, res) {
        console.log("check");
        if (req.user.userType === "Student") {
            return res.status(400).send("Only teacher can create an assignment");
        }
        const { subject, totalMarks, dueDate, dueTime, file, instructions} = req.body;
        const owner = req.user._id;
        const assignment = new Assignment({ subject, totalMarks, dueDate, dueTime, file, instructions, owner });
        assignment.save(function (err, doc) {
            if (err) {
                res.status(500).send({ message: err });
            } else {
                res.send("ok");
            }
        });
    },
    assignmentsByTeacher: async (req, res) => {
        const assignments = await Assignment.find({ owner: req.user._id });
        console.log(assignments);
        res.send(assignments);
    },
    book: function (req, res) {
        const { room, date, time, email} = req.body;
        const assignment = new Assignment({ room, date, time, email });
        assignment.save(function (err, doc) {
            if (err) {
                res.status(500).send({ message: err });
            } else {
                res.send("ok");
            }
        });
    },
};
