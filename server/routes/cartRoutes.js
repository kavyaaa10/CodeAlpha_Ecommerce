const express = require("express");

const router = express.Router();

const {
    addToCart,
    getCart,
    updateCart,
    removeFromCart
} = require("../controllers/cartController");

const authMiddleware = require("../middleware/Middleware");

router.post("/", authMiddleware, addToCart);

router.get("/", authMiddleware, getCart);

router.put("/:id", authMiddleware, updateCart);

router.delete("/:id", authMiddleware, removeFromCart);

module.exports = router;