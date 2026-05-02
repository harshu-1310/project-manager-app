import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import API from "./config";

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signup = async () => {
    try {
      await axios.post(`${API}/auth/signup`, {
        name,
        email,
        password
      });

      alert("Signup successful ✅");

      navigate("/");

    } catch (err) {
      console.log(err.response?.data);
      alert("Signup failed ❌");
    }
  };

  return (
    <div className="container">
      <div className="auth-card">
        <h2>Signup</h2>

        <input
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button onClick={signup}>Signup</button>

        <p>
          Already have account? <Link to="/">Login</Link>
        </p>
      </div>
    </div>
  );
}