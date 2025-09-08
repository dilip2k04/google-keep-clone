import API from "../api";

export default function NoteCard({ note, fetchNotes }) {
  const handleDelete = async () => {
    await API.delete(`/${note.id}`);
    fetchNotes();
  };

  return (
    <div className="note-card" style={{ backgroundColor: note.color }}>
      <h3>{note.title}</h3>
      <p>{note.content}</p>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}
