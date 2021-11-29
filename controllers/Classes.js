const Class = require("../models/Class.js");
const User = require("../models/User.js");

module.exports = {
    create: function (req, res) {
        console.log("check");
        if (req.user.userType === "Student") {
            return res.status(400).send("Only teacher can create an assignment");
        }
        const { name } = req.body;
        const owner = req.user._id;
        const new_class = new Class({ owner, name });
        new_class.save(function (err, doc) {
            if (err) {
                res.status(500).send({ message: err });
            } else {
                res.send(doc);
            }
        });
    },
    addMember: async function (req, res) {
        try {

            const classId = req.body.classId;
            const _class = await Class.findById(classId);
            console.log(req.user._id, _class.owner)
            const user = await User.findOne({ email: req.body.email });
            _class.members.push(user._id);
            await _class.save();
            return res.send(_class)
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    },
    addClass: async function (req, res) {
        const { name } = req.body;
        const owner = req.user._id;
        const classes = new Class({ name, owner });
        classes.save(function (err, doc) {
            if (err) {
                res.status(500).send({ message: err });
            } else {
                res.send("ok");
            }
        });
    },
    joinBycode: async function (req, res) {
        const { classId, member_id } = req.body;
        const _class = await Class.findById(classId);
        console.log(req.user._id, _class.owner)
        _class.members.push({ id: member_id });
        await _class.save();
        return res.send(_class)
    },

    classesByTeacher: async (req, res) => {
        const classes = await Class.find({ owner: req.user._id });
        console.log(classes);
        res.send(classes);
    },

    getClass: async (req, res) => {
        console.log(req.params);
        const _class = await Class.findById(req.params.id).populate('members', 'name _id email');
        console.log(_class);
        res.send(_class);
    }
};
