import { useState, useEffect } from "react";
import axios from "axios";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    const res = await axios.get("http://localhost:5000/api/projects", {
      headers: { Authorization: token }
    });
    setProjects(res.data);
  };

  const createProject = async () => {
    await axios.post(
      "http://localhost:5000/api/projects",
      { name, description: "New Project", members: [] },
      { headers: { Authorization: token } }
    );
    setName("");
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="main">
      <h1>Projects</h1>

      <input
        placeholder="Project name"
        value={name}
        onChange={e => setName(e.target.value)}
      />
      <button onClick={createProject}>Create</button>

      {projects.map(p => (
        <div className="card" key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}