const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");


// ============================
// ✅ CREATE TASK (ADMIN ONLY)
// ============================
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can create tasks" });
    }

    const task = await Task.create({
      title: req.body.title,
      description: req.body.description || "",

      // optional fields
      assignedTo: req.body.assignedTo || null,
      projectId: req.body.projectId || null,
      dueDate: req.body.dueDate || null
    });

    res.json(task);
  } catch (err) {
    console.log("CREATE TASK ERROR:", err);
    res.status(500).json({ msg: "Task creation failed" });
  }
});


// ============================
// ✅ GET ALL TASKS
// ============================
router.get("/", auth, async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("projectId", "name");

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch tasks" });
  }
});


// ============================
// ✅ UPDATE TASK (ADMIN)
// ============================
router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can update tasks" });
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

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Update failed" });
  }
});


// ============================
// ✅ DELETE TASK (ADMIN)
// ============================
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can delete tasks" });
    }

    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Delete failed" });
  }
});


// ============================
// 🔥 DASHBOARD STATS (OPTIONAL)
// ============================
router.get("/dashboard", auth, async (req, res) => {
  try {
    const total = await Task.countDocuments();
    const completed = await Task.countDocuments({ status: "done" });
    const overdue = await Task.countDocuments({
      dueDate: { $lt: new Date() },
      status: { $ne: "done" }
    });

    res.json({
      total,
      completed,
      overdue
    });
  } catch (err) {
    res.status(500).json({ msg: "Dashboard error" });
  }
});

module.exports = router;