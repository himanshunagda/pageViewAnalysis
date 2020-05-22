const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    count: {
        type: Number,
    },
    created_at: { type: Date, required: true, default: Date.now }
})

module.exports = mongoose.model("users", userSchema)