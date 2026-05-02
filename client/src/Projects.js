import { useState, useEffect } from "react";
import axios from "axios";
import API from "./config";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // ================= FETCH =================
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

  // ================= CREATE =================
  const createProject = async () => {
    try {
      await axios.post(
        `${API}/projects`,
        {
          name,
          description
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setName("");
      setDescription("");
      fetchProjects();

    } catch (err) {
      alert(err.response?.data?.msg || "Create failed");
    }
  };

  // ================= DELETE =================
  const deleteProject = async (id) => {
    if (!window.confirm("Delete this project?")) return;

    try {
      await axios.delete(`${API}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      fetchProjects();

    } catch (err) {
      alert(err.response?.data?.msg || "Delete failed");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="main">
      <h1>Projects</h1>

      {/* CREATE FORM */}
      <input
        placeholder="Project Title"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <textarea
        placeholder="Problem Statement / Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
        rows={4}
      />

      <button onClick={createProject}>Create</button>

      <hr />

      {/* PROJECT LIST */}
      {projects.map(p => (
        <div key={p._id} style={{ marginBottom: "20px" }}>
          <h3>{p.name}</h3>
          <p>{p.description}</p>

          <button onClick={() => deleteProject(p._id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}