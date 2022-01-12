const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const restaurantSchema = new Schema ({
    name: String, 
    neighborhood: String,
    best_dishes: String, 
    img: String,
    rating: Number, 
    recommended: String
}, {timestamps: true})

module.exports = mongoose.model("Restaurant", restaurantSchema)