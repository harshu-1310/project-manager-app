const express = require("express");
const router = express.Router();
const Project = require("../models/project");
const auth = require("../middleware/auth");

// CREATE PROJECT (ADMIN ONLY)
router.post("/", auth, async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ msg: "Only admin can create project" });

  const project = await Project.create({
    name: req.body.name,
    description: req.body.description,
    createdBy: req.user.id,
    members: req.body.members // team members
  });

  res.json(project);
});

// GET PROJECTS
router.get("/", auth, async (req, res) => {
  const projects = await Project.find().populate("members", "name email");
  res.json(projects);
});

module.exports = router;