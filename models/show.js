const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const showSchema = new Schema ({
    name: String,
    description: String, 
    img: String,
    rating: Number, 
    recommended: String
})

module.exports = mongoose.model("Show", showSchema)