const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// ================= CREATE PROJECT =================
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can create project" });
    }

    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.id,
      members: req.body.members || []
    });

    res.json(project);

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= GET PROJECTS =================
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find().populate("members", "name email");
    res.json(projects);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});


// ================= DELETE PROJECT =================
router.delete("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ msg: "Only admin can delete project" });
    }

    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    await project.deleteOne();

    res.json({ msg: "Project deleted successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;