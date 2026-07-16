const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/authController");

const authMiddleware = require("../middleware/middleware");

// Public Routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected Route
router.get("/profile", authMiddleware, getProfile);

module.exports = router;