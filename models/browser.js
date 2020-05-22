const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const browserSchema = new Schema({
    browser: {
        type: String,
    }
})

module.exports = mongoose.model("browser", browserSchema)