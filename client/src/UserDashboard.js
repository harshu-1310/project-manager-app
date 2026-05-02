import { useEffect, useState } from "react";
import axios from "axios";
import API from "./config";

export default function UserDashboard() {
  const [tasks, setTasks] = useState([]);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (role !== "member") {
    window.location = "/";
  }

  // ================= FETCH TASKS =================
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= COMPLETE TASK =================
  const completeTask = async (id) => {
    try {
      await axios.put(
        `${API}/tasks/${id}/status`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      fetchTasks();
    } catch (err) {
      alert("Failed to update");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="main">
      <h1>My Tasks</h1>

      {tasks.length === 0 && <p>No tasks assigned</p>}

      {tasks.map((task) => (
        <div
          key={task._id}
          style={{
            border: "1px solid #444",
            padding: "15px",
            marginBottom: "10px",
            borderRadius: "8px"
          }}
        >
          <h3>{task.title}</h3>
          <p>{task.description}</p>

          {task.status !== "done" ? (
            <button
              onClick={() => completeTask(task._id)}
              style={{
                background: "#22c55e",
                color: "white",
                padding: "6px 12px",
                borderRadius: "6px"
              }}
            >
              Complete
            </button>
          ) : (
            <p style={{ color: "green" }}>✅ Completed</p>
          )}
        </div>
      ))}
    </div>
  );
}