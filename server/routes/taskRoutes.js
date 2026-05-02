const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

// ================= CREATE TASK (ADMIN) =================
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can create tasks" });
    }

    const { title, description, assignedTo } = req.body;

    if (!assignedTo) {
      return res.status(400).json({ msg: "User not assigned" });
    }

    const task = await Task.create({
      title,
      description,
      assignedTo,
      status: "todo"
    });

    res.json(task);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Task creation failed" });
  }
});

// ================= GET TASKS =================
router.get("/", auth, async (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = await Task.find().populate("assignedTo", "name email");
    } else {
      tasks = await Task.find({ assignedTo: req.user.id });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Fetch failed" });
  }
});

// ================= COMPLETE TASK =================
router.put("/:id/status", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return res.status(404).json({ msg: "Task not found" });

    if (
      task.assignedTo.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.status = "done";
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});

module.exports = router;