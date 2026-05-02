import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    const token = localStorage.getItem("token");

    if (!token || role !== "member") {
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
      <div className="sidebar">
        <h2>User Panel</h2>

        <Link to="/tasks">My Tasks</Link>

        <button onClick={logout}>Logout</button>
      </div>

      <div className="main">
        <h1>User Dashboard</h1>
      </div>
    </div>
  );
}