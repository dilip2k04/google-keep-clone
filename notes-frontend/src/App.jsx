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
  const [editingNote, setEditingNote] = useState(null); // track note being edited
  const navigate = useNavigate();

  useEffect(() => { if (user) fetchNotes(); }, [user]);

  const fetchNotes = async () => {
    try {
      const res = await api.get(`/notes/user/${user.id}`);
      setNotes(res.data);
    } catch (err) { console.error(err); }
  };

  const handleCreate = async (note) => {
    try {
      const res = await api.post(`/notes/user/${user.id}`, note);
      setNotes([...notes, res.data]);
    } catch (err) { console.error(err); }
  };

  const handleUpdate = async (note) => {
    try {
      const res = await api.put(`/notes/${note.id}`, note);
      setNotes(notes.map((n) => (n.id === note.id ? res.data : n)));
      setEditingNote(null); // exit edit mode after update
    } catch (err) { console.error(err); }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      setNotes(notes.filter((n) => n.id !== id));
    } catch (err) { console.error(err); }
  };

  const handleEdit = (note) => setEditingNote(note); // open edit mode

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return (
    <Routes>
      <Route path="/login" element={<Login setUser={setUser} />} />
      <Route path="/register" element={<Register setUser={setUser} />} />
    </Routes>
  );

  return (
    <div>
      <Navbar onLogout={handleLogout} user={user} />

      <NoteForm
        onSubmit={editingNote ? handleUpdate : handleCreate}
        editingNote={editingNote}
      />

      <NoteList
        notes={notes}
        onEdit={handleEdit} // pass edit handler
        onDelete={handleDelete}
      />
    </div>
  );
}
