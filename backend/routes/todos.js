import express from "express";
import Todo from "../models/Todo.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// Get all todos
router.get("/", auth, async (req, res) => {
  try {
    console.log("User ID from token:", req.userId); // Debug log
    const todos = await Todo.find({ user: req.userId });
    console.log("Found todos:", todos); // Debug log
    res.json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ message: error.message });
  }
});

// Create todo
router.post("/", auth, async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.userId,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update todo
router.patch("/:id", auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      req.body,
      { new: true }
    );
    res.json(todo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete todo
router.delete("/:id", auth, async (req, res) => {
  try {
    await Todo.findOneAndDelete({ _id: req.params.id, user: req.userId });
    res.json({ message: "Todo deleted" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
