import { useState, useEffect } from "react";
import axios from "axios";
import API from "./config";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignedTo, setAssignedTo] = useState("");

  const token = localStorage.getItem("token");

  // ================= FETCH USERS =================
  const fetchUsers = async () => {
    const res = await axios.get(`${API}/auth/users`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setUsers(res.data);
  };

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setTasks(res.data);
  };

  // ================= CREATE TASK =================
  const createTask = async () => {
    if (!title || !assignedTo) {
      alert("Fill all fields");
      return;
    }

    await axios.post(
      `${API}/tasks`,
      {
        title,
        description,
        assignedTo
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    setTitle("");
    setDescription("");
    setAssignedTo("");

    fetchTasks();
  };

  // ================= COMPLETE TASK =================
  const completeTask = async (id) => {
    await axios.put(
      `${API}/tasks/${id}/status`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );

    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  return (
    <div className="main">
      <h1>Tasks</h1>

      {/* ADMIN CREATE */}
      <input
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <select onChange={(e) => setAssignedTo(e.target.value)}>
        <option value="">Assign User</option>
        {users.map((u) => (
          <option key={u._id} value={u._id}>
            {u.name} ({u.email})
          </option>
        ))}
      </select>

      <button onClick={createTask}>Add Task</button>

      <hr />

      {/* TASK LIST */}
      {tasks.map((t) => (
        <div
          key={t._id}
          style={{
            border: "1px solid #444",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{t.title}</h3>
          <p>{t.description}</p>

          {t.status !== "done" && (
            <button
              onClick={() => completeTask(t._id)}
              style={{
                background: "#22c55e",
                color: "white",
                padding: "6px 12px",
                borderRadius: "6px"
              }}
            >
              Complete
            </button>
          )}

          {t.status === "done" && <p>✅ Completed</p>}
        </div>
      ))}
    </div>
  );
}