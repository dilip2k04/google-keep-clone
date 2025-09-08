import { useEffect, useState } from "react";
import axios from "axios";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";

function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchNotes = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/notes");
      // Sort by createdAt descending
      const sortedNotes = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setNotes(sortedNotes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/notes/${id}`);
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdate = async (id, updatedNote) => {
    try {
      const res = await axios.put(`http://localhost:8080/api/notes/${id}`, updatedNote);
      setNotes(notes.map((note) => (note.id === id ? res.data : note)));
    } catch (error) {
      console.error(error);
    }
  };

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Notes App</h1>
      <NoteForm fetchNotes={fetchNotes} />
      <input
        type="text"
        placeholder="Search notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border p-2 mb-4 w-full rounded"
      />
      <NoteList notes={filteredNotes} handleDelete={handleDelete} handleUpdate={handleUpdate} />
    </div>
  );
}

export default App;
