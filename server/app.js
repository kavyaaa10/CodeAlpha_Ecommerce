const express = require("express");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());                  // <-- ADD THIS
app.use(express.urlencoded({ extended: true })); // <-- ADD THIS
app.use(express.static(path.join(__dirname, "../client")));

// Routes
app.use("/api/auth", authRoutes);

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/register.html"));
});

module.exports = app;