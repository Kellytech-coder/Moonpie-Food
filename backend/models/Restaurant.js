const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

module.exports = mongoose.model("Restaurant", RestaurantSchema);
