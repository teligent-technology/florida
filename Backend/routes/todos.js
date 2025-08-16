const express = require("express");
const Todo=require('../models/Todo.js')

const router = express.Router();

// List with optional filters
router.get("/", async (req, res) => {
  const { q = "", status = "all" } = req.query;
  const query = {
    ...(q ? { title: { $regex: q, $options: "i" } } : {}),
    ...(status === "open" ? { completed: false } : {}),
    ...(status === "done" ? { completed: true } : {})
  };
  const items = await Todo.find(query).sort({ createdAt: -1 });
  res.json({ ok: true, data: items });
});

// Create
router.post("/", async (req, res) => {
  const { title, dueDate, notes } = req.body || {};
  if (!title || !title.trim()) {
    return res.status(400).json({ ok: false, error: "Title is required" });
  }
  const todo = await Todo.create({
    title: title.trim(),
    dueDate: dueDate ? new Date(dueDate) : null,
    notes: notes || ""
  });
  res.status(201).json({ ok: true, data: todo });
});

// Update
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, dueDate, notes, completed } = req.body;
  const todo = await Todo.findByIdAndUpdate(
    id,
    { title, dueDate, notes, completed },
    { new: true, runValidators: true }
  );
  if (!todo) return res.status(404).json({ ok: false, error: "Not found" });
  res.json({ ok: true, data: todo });
});

// Toggle complete
router.patch("/:id/toggle", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo) return res.status(404).json({ ok: false, error: "Not found" });
  todo.completed = !todo.completed;
  await todo.save();
  res.json({ ok: true, data: todo });
});

// Delete
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const out = await Todo.findByIdAndDelete(id);
  if (!out) return res.status(404).json({ ok: false, error: "Not found" });
  res.json({ ok: true });
});

module.exports = router;
