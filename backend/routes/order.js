const express = require("express");
const Order = require("../models/Order");
const router = express.Router();

// Create new order
router.post("/", async (req, res) => {
    const order = await Order.create(req.body);
    res.json(order);
});

// Get order status
router.get("/:id", async (req, res) => {
    res.json(await Order.findById(req.params.id));
});

// Update order status (admin)
router.put("/:id", async (req, res) => {
    res.json(await Order.findByIdAndUpdate(req.params.id, req.body, { new: true }));
});

module.exports = router;
