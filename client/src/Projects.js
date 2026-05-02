import { useState, useEffect } from "react";
import axios from "axios";
import API from "./config";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    try {
      const res = await axios.get(`${API}/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProjects(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const createProject = async () => {
    try {
      await axios.post(
        `${API}/projects`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setName("");
      fetchProjects();
    } catch (err) {
      alert("Failed to create project");
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="main">
      <h1>Projects</h1>

      <input value={name} onChange={e => setName(e.target.value)} />
      <button onClick={createProject}>Create</button>

      {projects.map(p => (
        <div key={p._id}>{p.name}</div>
      ))}
    </div>
  );
}