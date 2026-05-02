import { useState, useEffect } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  // 🔥 LIVE BACKEND URL
  const API = "https://project-manager-app.onrender.com/api";

  // ✅ Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/projects`, {
        headers: { Authorization: token }
      });
      setProjects(res.data);
    } catch (err) {
      console.log("PROJECT ERROR:", err.response?.data || err.message);
    }
  };

  // ✅ Create Project
  const createProject = async () => {
    try {
      if (!name) {
        alert("Enter project name");
        return;
      }

      await axios.post(
        `${API}/projects`,
        {
          name,
          description: "New Project",
          members: []
        },
        {
headers: { Authorization: `Bearer ${token}` }        }
      );

      setName("");
      fetchProjects();

    } catch (err) {
      console.log("CREATE PROJECT ERROR:", err.response?.data || err.message);
      alert("Failed to create project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [token]);

  return (
    <div className="main">
      <h1>Projects</h1>

      <input
        placeholder="Project name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <button onClick={createProject}>Create</button>

      {projects.length === 0 ? (
        <p>No projects yet</p>
      ) : (
        projects.map(p => (
          <div className="card" key={p._id}>
            {p.name}
          </div>
        ))
      )}
    </div>
  );
}