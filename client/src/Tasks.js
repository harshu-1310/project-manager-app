import { useState, useEffect } from "react";
import axios from "axios";
import API from "./config";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const token = localStorage.getItem("token");

  // ============================
  // FETCH TASKS
  // ============================
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API}/tasks`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTasks(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  // ============================
  // CREATE TASK
  // ============================
  const createTask = async () => {
    if (!title) {
      alert("Enter task title ❗");
      return;
    }

    try {
      await axios.post(
        `${API}/tasks`,
        { title, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Task created ✅");

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert(err.response?.data?.msg || "Task creation failed ❌");
    }
  };

  // ============================
  // DELETE TASK
  // ============================
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API}/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Task deleted 🗑");
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Delete failed ❌");
    }
  };

  // ============================
  // UPDATE TASK
  // ============================
  const updateTask = async (id) => {
    try {
      await axios.put(
        `${API}/tasks/${id}`,
        {
          title: editTitle,
          description: editDesc
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Task updated ✏️");

      setEditId(null);
      fetchTasks();
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Update failed ❌");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="main">
      <h1>Tasks</h1>

      {/* ================= CREATE ================= */}
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

      <button onClick={createTask}>Add Task</button>

      <hr />

      {/* ================= LIST ================= */}
      {tasks.map((t) => (
        <div
          key={t._id}
          style={{
            border: "1px solid #444",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}
        >
          {editId === t._id ? (
            <>
              {/* EDIT MODE */}
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />

              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />

              <button onClick={() => updateTask(t._id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              {/* VIEW MODE */}
              <h3>{t.title}</h3>
              <p>{t.description || "No description"}</p>

              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: "10px"
                }}
              >
                <button
                  onClick={() => {
                    setEditId(t._id);
                    setEditTitle(t.title);
                    setEditDesc(t.description);
                  }}
                  style={{
                    background: "#10b981",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteTask(t._id)}
                  style={{
                    background: "#3b82f6",
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    border: "none"
                  }}
                >
                  Delete
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}