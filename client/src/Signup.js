import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const API = "https://project-manager-app.onrender.com/api";

  const signup = async () => {
    try {
      const res = await axios.post(`${API}/auth/signup`, {
        name,
        email,
        password,
        role: "member"
      });

      alert("Signup successful");
      window.location.href = "/";

    } catch (err) {
      console.log("SIGNUP ERROR:", err.response?.data || err.message);
      alert("Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2>Signup</h2>

        <input placeholder="Name" onChange={e => setName(e.target.value)} />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" onChange={e => setPassword(e.target.value)} />

        <button onClick={signup}>Signup</button>

        <p>Already have account? <Link to="/">Login</Link></p>
      </div>
    </div>
  );
}