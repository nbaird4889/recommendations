const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title: String,
    author: String,
    description: String, 
    img: String,
    rating: Number, 
    recommended: String
})

module.exports = mongoose.model("Book", bookSchema)