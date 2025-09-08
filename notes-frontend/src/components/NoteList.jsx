import React, { useState } from "react";

export default function NoteList({ notes = [], onEdit, onDelete }) {
  const [editingNote, setEditingNote] = useState(null);

  const handleSave = () => {
    onEdit(editingNote);
    setEditingNote(null);
  };

  if (!notes || notes.length === 0) return <p>No notes yet.</p>;

  return (
    <div className="note-list">
      {notes.map((note) => (
        <div key={note.id} style={{ backgroundColor: note.color }} className="note">
          {editingNote && editingNote.id === note.id ? (
            <>
              <input
                type="text"
                value={editingNote.title}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, title: e.target.value })
                }
              />
              <textarea
                value={editingNote.content}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, content: e.target.value })
                }
              />
              <input
                type="color"
                value={editingNote.color}
                onChange={(e) =>
                  setEditingNote({ ...editingNote, color: e.target.value })
                }
              />
              <button onClick={handleSave}>Save</button>
              <button onClick={() => setEditingNote(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => setEditingNote(note)}>Edit</button>
              <button onClick={() => onDelete(note.id)}>Delete</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
