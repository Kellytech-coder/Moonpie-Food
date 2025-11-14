require("dotenv").config();
const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const connectDB = require("./config/db");

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// ROUTES
app.use("/api/menu", require("./routes/menu"));
app.use("/api/orders", require("./routes/orders"));
app.use("/api/admin", require("./routes/admin"));

// STRIPE PAYMENT
app.post("/api/payment", async (req, res) => {
    const { total } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: "FoodExpress Order"
                },
                unit_amount: total * 100,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: "http://localhost:5500/frontend/order-tracking.html",
        cancel_url: "http://localhost:5500/frontend/cart.html",
    });

    res.json({ url: session.url });
});

// START SERVER
app.listen(5000, () => console.log("Server running on port 5000"));
