import { useState, useEffect } from "react";
import axios from "axios";
import API from "./config";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");
  const [editDesc, setEditDesc] = useState("");

  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    const res = await axios.get(`${API}/projects`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setProjects(res.data);
  };

  const createProject = async () => {
    await axios.post(
      `${API}/projects`,
      { name, description },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setName("");
    setDescription("");
    fetchProjects();
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`${API}/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch {
      alert("Delete failed");
    }
  };

  const updateProject = async (id) => {
    await axios.put(
      `${API}/projects/${id}`,
      {
        name: editName,
        description: editDesc
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    setEditId(null);
    fetchProjects();
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <div className="main">
      <h1>Projects</h1>

      {/* CREATE */}
      <input
        placeholder="Project Title"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={createProject}>Create</button>

      <hr />

      {/* LIST */}
      {projects.map((p) => (
        <div
          key={p._id}
          style={{
            border: "1px solid #444",
            padding: "15px",
            marginBottom: "15px",
            borderRadius: "8px"
          }}
        >
          {editId === p._id ? (
            <>
              {/* EDIT MODE */}
              <input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />

              <textarea
                value={editDesc}
                onChange={(e) => setEditDesc(e.target.value)}
              />

              <button onClick={() => updateProject(p._id)}>Save</button>
              <button onClick={() => setEditId(null)}>Cancel</button>
            </>
          ) : (
            <>
              {/* VIEW MODE */}
              <h3>{p.name}</h3>
              <p>{p.description}</p>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
                <button
                  onClick={() => {
                    setEditId(p._id);
                    setEditName(p.name);
                    setEditDesc(p.description);
                  }}
                  style={{
                    background: "#10b981",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px"
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteProject(p._id)}
                  style={{
                    background: "#3b82f6",
                    color: "white",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "6px"
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