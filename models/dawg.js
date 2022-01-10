const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const dawgSchema = new Schema ({
    item: String, 
    link: String,
    description: String, 
    img: String,
    rating: Number, 
    recommended: String
})

module.exports = mongoose.model("Dawg", dawgSchema)