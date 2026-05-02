const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// CREATE TASK (ADMIN)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Only admin can assign tasks" });

  const task = await Task.create({
    title: req.body.title,
    assignedTo: req.body.assignedTo,
    projectId: req.body.projectId,
    dueDate: req.body.dueDate
  });

  res.json(task);
});

// UPDATE STATUS (MEMBER)
router.put("/:id", auth, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ msg: "Task not found" });

  if (task.assignedTo.toString() !== req.user.id)
    return res.status(403).json({ msg: "Not your task" });

  task.status = req.body.status;
  await task.save();

  res.json(task);
});

// GET TASKS
router.get("/", auth, async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

module.exports = router;