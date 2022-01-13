const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const recipeSchema = new Schema ({
    name: String, 
    link: String,
    img: String,
    rating: Number, 
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

module.exports = mongoose.model("Recipe", recipeSchema)