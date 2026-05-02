import { useState, useEffect } from "react";
import axios from "axios";
import API from "./config";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    const res = await axios.get(`${API}/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProjects(res.data);
  };

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  const createTask = async () => {
    await axios.post(
      `${API}/tasks`,
      { title, projectId },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    fetchTasks();
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();
  }, []);

  return (
    <div className="main">
      <h1>Tasks</h1>

      <input value={title} onChange={e => setTitle(e.target.value)} />

      <select onChange={e => setProjectId(e.target.value)}>
        <option>Select Project</option>
        {projects.map(p => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <button onClick={createTask}>Add Task</button>

      {tasks.map(t => (
        <div key={t._id}>{t.title}</div>
      ))}
    </div>
  );
}