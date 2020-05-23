const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const statSchema = new Schema({
    name: {
        type: String,
    },
    count: {
        type: Number,
    }
})

module.exports = mongoose.model("homePageViews", statSchema)