const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const testSchema = new Schema({
    country: {
        type: String,
    }
})

module.exports = mongoose.model("country", testSchema)