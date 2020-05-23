const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    session: {
        type: String,
    }
})

module.exports = mongoose.model("session", sessionSchema)