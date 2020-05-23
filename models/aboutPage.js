const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const pageSchema = new Schema({
    country: {
        type: String,
    }
})

module.exports = mongoose.model("addCountry", pageSchema)