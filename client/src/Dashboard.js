import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API from "./config";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // 🔒 Protect route
    if (!token) {
      alert("Please login first");
      navigate("/");
      return;
    }

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
        console.log("Dashboard error:", err.response?.data || err.message);

        // 🔥 token expired or invalid
        if (err.response?.status === 401) {
          alert("Session expired, login again");
          localStorage.clear();
          navigate("/");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  return (
    <div className="app">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2>🚀 Manager</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>

        <button
          onClick={() => {
            localStorage.clear();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="main">
        <h1>Dashboard</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="stats">
              <div>Total: {stats.total || 0}</div>
              <div>Completed: {stats.completed || 0}</div>
              <div>Overdue: {stats.overdue || 0}</div>
            </div>

            <h2>Tasks</h2>

            {tasks.length === 0 ? (
              <p>No tasks found</p>
            ) : (
              tasks.map(task => (
                <div key={task._id}>
                  <h3>{task.title}</h3>
                  <p>Status: {task.status}</p>
                </div>
              ))
            )}
          </>
        )}
      </div>
    </div>
  );
}