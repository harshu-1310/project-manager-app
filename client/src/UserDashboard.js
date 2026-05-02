export default function UserDashboard() {
  const role = localStorage.getItem("role");

  // 🔒 Protect route
  if (role !== "member") {
    window.location = "/";
  }

  const logout = () => {
    localStorage.clear();
    window.location = "/";
  };

  return (
    <div className="app">
      <div className="sidebar">
        <h2>User Panel</h2>
        <a href="/tasks">My Tasks</a>

        {/* 🔥 Logout */}
        <button onClick={logout}>Logout</button>
      </div>

      <div className="main">
        <h1>User Dashboard</h1>
      </div>
    </div>
  );
}