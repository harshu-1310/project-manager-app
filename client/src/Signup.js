import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import API from "./config";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await axios.post(`${API}/auth/signup`, {
        name,
        email,
        password,
        role: "member"
      });

      alert("Signup successful");
      window.location.href = "/";

    } catch (err) {
      console.log("SIGNUP ERROR:", err.response?.data || err.message);
      alert(err.response?.data?.msg || "Signup failed");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2>Signup</h2>

        <input placeholder="Name" onChange={e => setName(e.target.value)} />
        <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

        <button onClick={signup}>Signup</button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}