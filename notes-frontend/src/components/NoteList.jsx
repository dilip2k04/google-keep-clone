import api from "../api";

export default function NoteList({ notes, fetchNotes }) {
  const handleDelete = async (id) => {
    try {
      await api.delete(`/${id}`);
      fetchNotes();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      {notes.map((note) => (
        <div
          key={note.id}
          className="border p-4 mb-2 rounded"
          style={{ backgroundColor: note.color }}
        >
          <h2 className="font-bold">{note.title}</h2>
          <p>{note.content}</p>
          <button
            onClick={() => handleDelete(note.id)}
            className="bg-red-500 text-white p-1 mt-2 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}
