const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");

// CREATE PROJECT (ADMIN ONLY)
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


// GET PROJECTS (ONLY USER'S PROJECTS)
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find({
      $or: [
        { createdBy: req.user.id },
        { members: req.user.id }
      ]
    }).populate("members", "name email");

    res.json(projects);

  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;