import { useEffect, useState } from "react";
import api from "./api";
import NoteForm from "./components/NoteForm";
import NoteList from "./components/NoteList";
import "./App.css";

function App() {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    try {
      const response = await api.get("");
      setNotes(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Notes App</h1>
      <NoteForm fetchNotes={fetchNotes} />
      <NoteList notes={notes} fetchNotes={fetchNotes} />
    </div>
  );
}

export default App;
