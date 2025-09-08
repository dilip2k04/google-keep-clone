import { useState } from "react";

export default function NoteList({ notes, handleDelete, handleUpdate }) {
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editColor, setEditColor] = useState("#ffffff");

  const startEditing = (note) => {
    setEditingNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content);
    setEditColor(note.color || "#ffffff");
  };

  const saveEdit = () => {
    handleUpdate(editingNoteId, { title: editTitle, content: editContent, color: editColor });
    setEditingNoteId(null);
  };

  const cancelEdit = () => setEditingNoteId(null);

  return (
    <div className="grid grid-cols-1 gap-4">
      {notes.map((note) => (
        <div
          key={note.id}
          className="border p-4 rounded"
          style={{ backgroundColor: note.color || "#fff" }}
        >
          {editingNoteId === note.id ? (
            <>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="border p-1 mb-1 w-full rounded"
              />
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="border p-1 mb-1 w-full rounded"
              />
              <input
                type="color"
                value={editColor}
                onChange={(e) => setEditColor(e.target.value)}
                className="mb-2"
              />
              <div>
                <button onClick={saveEdit} className="bg-green-500 text-white p-1 rounded mr-2">
                  Save
                </button>
                <button onClick={cancelEdit} className="bg-gray-500 text-white p-1 rounded">
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <>
              <h2 className="font-bold text-xl">{note.title}</h2>
              <p>{note.content}</p>
              <div className="mt-2">
                <button
                  onClick={() => startEditing(note)}
                  className="bg-yellow-500 text-white p-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(note.id)}
                  className="bg-red-500 text-white p-1 rounded"
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
