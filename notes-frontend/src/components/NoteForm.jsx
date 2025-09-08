import { useState } from "react";
import axios from "axios";

export default function NoteForm({ fetchNotes }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [color, setColor] = useState("#ffffff");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/notes", { title, content, color });
      setTitle("");
      setContent("");
      setColor("#ffffff");
      fetchNotes();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mr-2 rounded w-1/3"
        required
      />
      <input
        type="text"
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border p-2 mr-2 rounded w-1/2"
        required
      />
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="mr-2"
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Add Note
      </button>
    </form>
  );
}
