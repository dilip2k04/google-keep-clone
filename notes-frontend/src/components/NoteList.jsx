import React from "react";
import api from "../api";

export default function NoteList({ notes = [], onDelete, onEdit, onUpdate }) {
  if (!notes || notes.length === 0) return <p>No notes yet.</p>;

  // Toggle checklist items inline
  const handleChecklistToggle = async (note, index) => {
    const updatedChecklist = note.content.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );

    const updatedNote = { ...note, content: updatedChecklist };

    try {
      await api.put(`/notes/${note.id}`, updatedNote); // update backend
      onUpdate(updatedNote); // update frontend state
    } catch (err) {
      console.error("Failed to update checklist:", err);
    }
  };

  return (
    <div>
      {notes.map((note) => (
        <div
          key={note.id}
          style={{
            backgroundColor: note.color,
            marginBottom: "15px",
            padding: "15px",
            borderRadius: "8px",
            boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
          }}
        >
          <h3 style={{ marginBottom: "10px", color: "#1976d2" }}>{note.title}</h3>

          {note.type === "text" && <p>{note.content}</p>}

          {note.type === "checklist" && Array.isArray(note.content) && (
            <ul style={{ listStyle: "none", paddingLeft: 0 }}>
              {note.content.map((item, index) => (
                <li key={index} style={{ marginBottom: "5px" }}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleChecklistToggle(note, index)}
                    style={{ marginRight: "8px" }}
                  />
                  {item.text}
                </li>
              ))}
            </ul>
          )}

          {note.type === "file" && Array.isArray(note.content) && (
            <ul>
              {note.content.map((file, index) => (
                <li key={index}>
                  <a href={file.url} target="_blank" rel="noopener noreferrer">{file.name}</a>
                </li>
              ))}
            </ul>
          )}

          <div style={{ marginTop: "10px" }}>
            <button
              onClick={() => onEdit(note)} // <-- open form for editing
              style={{
                marginRight: "10px",
                padding: "5px 10px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#1976d2",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(note.id)}
              style={{
                padding: "5px 10px",
                borderRadius: "4px",
                border: "none",
                backgroundColor: "#e53935",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
