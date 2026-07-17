const express = require("express");
const router = express.Router();

const {
    createOrder,
    getMyOrders,
    getOrderById
} = require("../controllers/orderController");

const authMiddleware = require("../middleware/Middleware");

// Create Order
router.post("/", authMiddleware, createOrder);

// Get Logged-in User Orders
router.get("/myorders", authMiddleware, getMyOrders);

// Get Single Order
router.get("/:id", authMiddleware, getOrderById);

module.exports = router;