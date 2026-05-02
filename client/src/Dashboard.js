import { useEffect, useState } from "react";
import axios from "axios";
import API from "./config";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const t = await axios.get(`${API}/tasks`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        const s = await axios.get(`${API}/tasks/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTasks(t.data);
        setStats(s.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <div className="sidebar">
        <h2>🚀 Manager</h2>
        <a href="/dashboard">Dashboard</a>
        <a href="/projects">Projects</a>
        <a href="/tasks">Tasks</a>
      </div>

      <div className="main">
        <h1>Dashboard</h1>

        <div className="stats">
          <div>Total: {stats.total || 0}</div>
          <div>Completed: {stats.completed || 0}</div>
          <div>Overdue: {stats.overdue || 0}</div>
        </div>

        <h2>Tasks</h2>

        {tasks.map(task => (
          <div key={task._id}>
            <h3>{task.title}</h3>
            <p>Status: {task.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}