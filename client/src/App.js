import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";
import Dashboard from "./Dashboard";
import Projects from "./Projects";
import Tasks from "./Tasks";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";

// 🔐 Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔓 Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* 🔐 Protected Routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/user"
          element={
            <PrivateRoute>
              <UserDashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />

        {/* 🔁 Fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;