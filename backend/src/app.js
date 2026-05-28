const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Health check
app.get("/", (req, res) => {
  res.send("API Running");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", authMiddleware, taskRoutes);

// Protected route example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = app;