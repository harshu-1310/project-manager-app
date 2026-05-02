import { useState, useEffect } from "react";
import axios from "axios";
import API from "./config";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createProject = async () => {
    try {
      await axios.post(
        `${API}/projects`,
        {
          name,
          description   // ✅ ADD THIS
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setName("");
      setDescription("");
      fetchProjects();

    } catch (err) {
      alert(err.response?.data?.msg || "Failed to create project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="main">
      <h1>Projects</h1>

      {/* PROJECT TITLE */}
      <input
        placeholder="Project Title"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      {/* PROBLEM STATEMENT */}
      <textarea
        placeholder="Problem Statement / Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={4}
      />

      <button onClick={createProject}>Create</button>

      <hr />

      {/* DISPLAY PROJECTS */}
      {projects.map(p => (
        <div key={p._id} style={{ marginBottom: "15px" }}>
          <h3>{p.name}</h3>
          <p>{p.description}</p> {/* ✅ SHOW DESCRIPTION */}
        </div>
      ))}
    </div>
  );
}