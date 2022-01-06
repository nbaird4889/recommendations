const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    name: {type: String, required: true},
    author: {type: String, required: true},
    description: {type: String},
    img: {type: String},
    rating: {type: Number, min: 0, max: 5},
})

module.exports = mongoose.model("Book", bookSchema)