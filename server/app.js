const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes"); // ✅ ADD THIS

const orderRoutes = require("./routes/orderRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../client")));
app.use("/images", express.static(path.join(__dirname, "../images")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes); // ✅ ADD THIS
app.use("/api/orders", orderRoutes);

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/register.html"));
});

module.exports = app;