const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    name: String, 
    link: String,
    img: String,
    rating: Number, 
    recommended: String
})

module.exports = mongoose.model("Recipe", recipeSchema)