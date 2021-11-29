const mongoose = require("mongoose");
const ClassSchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
        owner: { type: mongoose.SchemaTypes.ObjectId, required: true },
        members: [{  type: mongoose.SchemaTypes.ObjectId, ref: 'User' }]
    },
 
    {
        timestamp: true
    }
);

module.exports = mongoose.model("Class", ClassSchema);
