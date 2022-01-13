const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const showSchema = new Schema ({
    name: String,
    description: String, 
    img: String,
    rating: Number, 
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})

module.exports = mongoose.model("Show", showSchema)