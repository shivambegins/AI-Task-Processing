const express = require("express");
const router = express.Router();
const {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

// POST   /api/tasks       - Create a task
router.post("/", createTask);

// GET    /api/tasks       - Get all tasks
router.get("/", getTasks);

// GET    /api/tasks/:id   - Get a single task
router.get("/:id", getTaskById);

// PUT    /api/tasks/:id   - Update a task
router.put("/:id", updateTask);

// DELETE /api/tasks/:id   - Delete a task
router.delete("/:id", deleteTask);

module.exports = router;
