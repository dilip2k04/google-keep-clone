import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import api from "./api";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

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

  const handleCreate = async (note) => {
    try {
      const res = await api.post(`/notes/user/${user.id}`, note);
      setNotes([...notes, res.data]);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdate = async (note) => {
    try {
      const res = await api.put(`/notes/${note.id}`, note);
      setNotes(notes.map(n => (n.id === note.id ? res.data : n)));
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter(n => n.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Logged-out routes
  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }

  // Logged-in routes
  return (
    <>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <NoteForm onSubmit={handleCreate} />
              <NoteList notes={notes} onEdit={handleUpdate} onDelete={handleDelete} />
            </>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
