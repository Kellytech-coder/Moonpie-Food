const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
    restaurant: String
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);
