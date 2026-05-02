import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    // 🔒 Protect route
    if (!token || role !== "admin") {
      alert("Access denied ❌");
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="app">
      
      {/* Sidebar */}
      <div className="sidebar">
        <h2>👑 Admin Panel</h2>

        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>

        <button onClick={logout}>Logout</button>
      </div>

      {/* Main */}
      <div className="main">
        <h1>Admin Dashboard</h1>

        <p>Welcome Admin 🚀</p>
        <p>You can manage projects, tasks, and users.</p>
      </div>
    </div>
  );
}