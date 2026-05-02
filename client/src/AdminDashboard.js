export default function AdminDashboard() {

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>Admin Panel</h2>

        <a href="/projects">Projects</a>
        <a href="/tasks">Tasks</a>

        {/* 🔥 LOGOUT BUTTON */}
        <button onClick={logout}>Logout</button>

      </div>

      <div className="main">
        <h1>Admin Dashboard</h1>
      </div>
    </div>
  );
}