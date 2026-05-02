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

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description || "",
      assignedTo: req.body.assignedTo || null,
      projectId: req.body.projectId || null,
      dueDate: req.body.dueDate || null
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
      tasks = await Task.find();
    } else {
      tasks = await Task.find({ assignedTo: req.user.id });
    }

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Fetch failed" });
  }
});


// ================= UPDATE TASK (ADMIN) =================
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can update task" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status
      },
      { new: true }
    );

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});


// ================= COMPLETE TASK (USER + ADMIN) =================
router.put("/:id/status", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (
      task.assignedTo?.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ msg: "Not allowed" });
    }

    task.status = req.body.status; // "done"
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Status update failed" });
  }
});


// ================= DELETE TASK (ADMIN) =================
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can delete task" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
});


// ================= DASHBOARD STATS =================
router.get("/dashboard", auth, async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: "done" });
    const overdue = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "done" }
    });

    res.json({ total, completed, overdue });
  } catch (err) {
    res.status(500).json({ msg: "Dashboard error" });
  }
});

module.exports = router;