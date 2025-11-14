const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    items: Array,
    total: Number,
    status: {
        type: String,
        default: "Placed"   // Placed → Preparing → Out for delivery → Delivered
    },
    userInfo: Object,
});

module.exports = mongoose.model("Order", OrderSchema);
