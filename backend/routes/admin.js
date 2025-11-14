const express = require("express");
const Restaurant = require("../models/Restaurant");
const MenuItem = require("../models/MenuItem");
const router = express.Router();

// Restaurants
router.post("/restaurant", async (req, res) => {
    res.json(await Restaurant.create(req.body));
});

router.get("/restaurants", async (req, res) => {
    res.json(await Restaurant.find());
});

// Menu items by restaurant
router.get("/menu/:restaurant", async (req, res) => {
    res.json(await MenuItem.find({ restaurant: req.params.restaurant }));
});

module.exports = router;
