import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // 🔥 YOUR LIVE BACKEND URL
const res = await axios.post("https://project-manager-app-production.up.railway.app/api/auth/login", {...});
  const login = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password
      });

      console.log("LOGIN RESPONSE:", res.data);

      const token = res.data.token;
      const role = res.data.role;

      if (!token) {
        alert("Login failed: token missing");
        return;
      }

      // ✅ Save token & role
      localStorage.setItem("token", token);
      localStorage.setItem("role", role || "member");

      // ✅ Redirect
      if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard"; // safer default
      }

    } catch (err) {
      console.log("LOGIN ERROR:", err.response?.data || err.message);
      alert("Invalid email or password");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={login}>Login</button>

        <p>
          New user? <a href="/signup">Signup</a>
        </p>
      </div>
    </div>
  );
}