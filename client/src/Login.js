import { Link } from "react-router-dom";
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

      const { token, role } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      if (role === "admin") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/user";
      }

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Invalid credentials");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2>Login</h2>

        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button onClick={login}>Login</button>
        <p>
  New user? <Link to="/signup">Signup</Link>
</p>
      </div>
    </div>
  );
}