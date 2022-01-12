const res = require("express/lib/response");
const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const bookSchema = new Schema ({
    title: {type: String, required: true},
    author: {type: String, required: true},
    description: String, 
    img: String,
    rating: Number,
    recommended: String,
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
});


module.exports = mongoose.model("Book", bookSchema)