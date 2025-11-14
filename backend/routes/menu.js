const express = require("express");
const MenuItem = require("../models/MenuItem");
const router = express.Router();

// GET all menu items
router.get("/", async (req, res) => {
    res.json(await MenuItem.find());
});

// Add menu item
router.post("/", async (req, res) => {
    res.json(await MenuItem.create(req.body));
});

module.exports = router;
