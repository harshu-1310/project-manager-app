import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});

  const token = localStorage.getItem("token");

  // 🔥 YOUR LIVE BACKEND URL
await axios.get("https://project-manager-app-production.up.railway.app/api/tasks", {...});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const t = await axios.get(`${API}/tasks`, {
          headers: { Authorization: token }
        });

        const s = await axios.get(`${API}/tasks/dashboard`, {
          headers: { Authorization: token }
        });

        setTasks(t.data);
        setStats(s.data);

      } catch (err) {
        console.log("Error:", err);
      }
    };

    fetchData();
  }, [token]);

  return (
    <div className="app">

      {/* Sidebar */}
      <div className="sidebar">
        <h2>🚀 Manager</h2>
        <a href="/dashboard">Dashboard</a>
        <a href="/projects">Projects</a>
        <a href="/tasks">Tasks</a>
      </div>

      {/* Main */}
      <div className="main">

        <h1>Dashboard</h1>

        {/* Stats */}
        <div className="stats">
          <div className="stat-box">Total: {stats.total || 0}</div>
          <div className="stat-box">Completed: {stats.completed || 0}</div>
          <div className="stat-box">Overdue: {stats.overdue || 0}</div>
        </div>

        {/* Task List */}
        <h2>Tasks</h2>

        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map(task => (
            <div className="card" key={task._id}>
              <h3>{task.title}</h3>
              <p>Status: {task.status}</p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}