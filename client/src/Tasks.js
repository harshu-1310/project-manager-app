import { useState, useEffect } from "react";
import axios from "axios";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // ✅ Fetch Projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/projects", {
        headers: { Authorization: token }
      });
      setProjects(res.data);
    } catch (err) {
      console.log("PROJECT ERROR:", err.response?.data || err.message);
    }
  };

  // ✅ Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", {
        headers: { Authorization: token }
      });
      setTasks(res.data);
    } catch (err) {
      console.log("TASK ERROR:", err.response?.data || err.message);
    }
  };

  // ✅ Create Task
  const createTask = async () => {
    try {
      if (!title) {
        alert("Enter task title");
        return;
      }

      if (!projectId) {
        alert("Select project");
        return;
      }

      setLoading(true);

      await axios.post(
        "http://localhost:5000/api/tasks",
        {
          title,
          projectId
        },
        {
          headers: { Authorization: token }
        }
      );

      setTitle("");
      setProjectId("");
      fetchTasks();

    } catch (err) {
      console.log("CREATE TASK ERROR:", err.response?.data || err.message);
      alert("Failed to create task");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Update Status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${id}`,
        { status },
        {
          headers: { Authorization: token }
        }
      );
      fetchTasks();
    } catch (err) {
      console.log("STATUS ERROR:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchTasks();

    const interval = setInterval(fetchTasks, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="main">
      <h1>Tasks</h1>

      {/* 🔴 If NO projects */}
      {projects.length === 0 ? (
        <div className="card">
          <p>⚠️ No projects found</p>
          <p>Create a project first</p>
          <a href="/projects">Go to Projects →</a>
        </div>
      ) : (
        <div className="card">
          <input
            placeholder="Task title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          {/* ✅ Project Dropdown */}
          <select
            value={projectId}
            onChange={e => setProjectId(e.target.value)}
          >
            <option value="">Select Project</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          <button onClick={createTask} disabled={loading}>
            {loading ? "Creating..." : "Add Task"}
          </button>
        </div>
      )}

      {/* ✅ Task List */}
      {tasks.length === 0 ? (
        <p>No tasks yet</p>
      ) : (
        tasks.map(t => (
          <div className="card" key={t._id}>
            <h3>{t.title}</h3>

            <select
              value={t.status}
              onChange={e => updateStatus(t._id, e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}