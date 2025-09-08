import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import api from "./api";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);
  const navigate = useNavigate();

  // Fetch notes when user logs in
  useEffect(() => {
    if (user) fetchNotes();
  }, [user]);

  const fetchNotes = async () => {
    try {
      const res = await api.get(`/notes/user/${user.id}`);
      setNotes(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Create a new note
  const handleCreate = async (note) => {
    try {
      const res = await api.post(`/notes/user/${user.id}`, note);
      setNotes([...notes, res.data]);
      setEditingNote(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Update note (from NoteForm or checklist toggle)
  const handleUpdate = async (note) => {
    try {
      const res = await api.put(`/notes/${note.id}`, note);
      setNotes(notes.map(n => (n.id === note.id ? res.data : n)));
      setEditingNote(null);
    } catch (err) {
      console.error(err);
    }
  };

  // Delete note
  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  // Logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) {
    return (
      <Routes>
        <Route path="/" element={<Login setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
      </Routes>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif", maxWidth: "900px", margin: "auto", padding: "20px" }}>
      <Navbar user={user} onLogout={handleLogout} />

      <h2 style={{ textAlign: "center", color: "#333" }}>Welcome, {user.username}</h2>
      <h3 style={{ textAlign: "center", color: "#555" }}>Your Notes</h3>

      <NoteForm
        onSubmit={editingNote ? handleUpdate : handleCreate}
        editingNote={editingNote}
        onCancelEdit={() => setEditingNote(null)}
      />

      <NoteList
        notes={notes}
        onEdit={setEditingNote}    // opens note in form for editing
        onUpdate={handleUpdate}     // updates backend for checklist ticking
        onDelete={handleDelete}
      />
    </div>
  );
}
