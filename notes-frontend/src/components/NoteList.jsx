import React from "react";

export default function NoteList({ notes = [], onDelete, onEdit }) {
  if (!notes || notes.length === 0) return <p>No notes yet.</p>;

  const handleChecklistToggle = (note, index) => {
    const updatedChecklist = note.content.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    onEdit({ ...note, content: updatedChecklist }); // update backend inline
  };

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} style={{ backgroundColor: note.color, marginBottom: "10px", padding: "10px" }}>
          <h3>{note.title}</h3>

          {note.type === "text" && <p>{note.content}</p>}

          {note.type === "checklist" && Array.isArray(note.content) && (
            <ul>
              {note.content.map((item, index) => (
                <li key={index}>
                  <input
                    type="checkbox"
                    checked={item.done}
                    onChange={() => handleChecklistToggle(note, index)}
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

          <button onClick={() => onEdit(note)}>Edit</button>
          <button onClick={() => onDelete(note.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
