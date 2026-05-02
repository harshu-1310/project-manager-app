const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// CREATE TASK (ADMIN)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can assign tasks" });
    }

    const task = await Task.create({
      title: req.body.title,
      assignedTo: req.body.assignedTo,
      projectId: req.body.projectId,
      dueDate: req.body.dueDate
    });

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// UPDATE STATUS (MEMBER)
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (task.assignedTo.toString() !== req.user.id) {
      return res.status(403).json({ msg: "Not your task" });
    }

    task.status = req.body.status;
    await task.save();

    res.json(task);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// GET TASKS (ONLY USER'S TASKS)
router.get("/", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignedTo: req.user.id });
    }

    res.json(tasks);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// 🔥 DASHBOARD STATS (VERY IMPORTANT)
router.get("/dashboard", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignedTo: req.user.id });
    }

    const stats = {
      total: tasks.length,
      completed: tasks.filter(t => t.status === "done").length,
      overdue: tasks.filter(
        t => t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done"
      ).length
    };

    res.json(stats);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;