import { useState } from "react";
import axios from "axios";
import API from "./config";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    try {
      const res = await axios.post(`${API}/auth/login`, {
        email,
        password
      });

      const token = res.data.token;
      const role = res.data.role;

      if (!token || !role) {
        alert("Login failed");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/dashboard";
      }

    } catch (err) {
      console.log(err.response?.data || err.message);
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