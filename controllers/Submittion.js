const Submittion = require("../models/Submittion.js");
const User = require("../models/User.js");

module.exports = {
    submit: function (req, res) {
        console.log("check submit");
        if (req.user.userType === "Teacher") {
            return res.status(400).send("Only student can submit an assignment");
        }
        const { file, work } = req.body;
        const assignee = req.user._id;
        const assignmentId = "619e7c3a25b4f72710b8d351";
        const submittion = new Submittion({ assignmentId, file, work, assignee });
        submittion.save(function (err, doc) {
            if (err) {
                res.status(500).send({ message: err });
            } else {
                res.send("ok");
            }
        });
    },
};
