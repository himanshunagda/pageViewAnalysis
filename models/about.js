const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const aboutSchema = new Schema({
    name: {
        type: String,
    },
    count: {
        type: Number,
    },
})

module.exports = mongoose.model("about", aboutSchema)