const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const SubmittionSchema = new mongoose.Schema({
    assignmentId: {
        type: mongoose.SchemaTypes.ObjectId, required: true
    },
    file: {
        type: 'string',
        required: false,
    },

    work: {
        type: 'string',
        required: true,
    },

    assignee: { type: mongoose.SchemaTypes.ObjectId, required: true },

}, {
    timestamp: true
});

module.exports = mongoose.model("Submittion", SubmittionSchema);
