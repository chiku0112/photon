const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const AssignmentSchema = new mongoose.Schema({

    subject: {
        type: 'string',
        required: true,
    },

    totalMarks: {
        type: 'number',
        required: true,
    },

    dueDate: {
        type: 'date',
        required: true,
    },

    dueTime: {
        type: 'string',
        required: true,
    },

    file: {
        type: 'string',
        required: false,
    },

    instructions: {
        type: 'string',
        required: false,
    },


     owner: { type: mongoose.SchemaTypes.ObjectId, required: true },

}, {
    timestamp: true
});

module.exports = mongoose.model("Assignment", AssignmentSchema);
