import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API from "./config";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    fetchProjects();
    fetchTasks();
  }, [token]);

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

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const createTask = async () => {
    if (!title || !projectId) {
      alert("Fill all fields ❌");
      return;
    }

    try {
      await axios.post(
        `${API}/tasks`,
        { title, projectId },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      setTitle("");
      fetchTasks();

    } catch {
      alert("Task creation failed ❌");
    }
  };

  return (
    <div className="main">
      <h1>Tasks</h1>

      <input
        value={title}
        placeholder="Task title"
        onChange={e => setTitle(e.target.value)}
      />

      <select onChange={e => setProjectId(e.target.value)}>
        <option value="">Select Project</option>
        {projects.map(p => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>

      <button onClick={createTask}>Add Task</button>

      {tasks.length === 0 ? (
        <p>No tasks</p>
      ) : (
        tasks.map(t => <div key={t._id}>{t.title}</div>)
      )}
    </div>
  );
}