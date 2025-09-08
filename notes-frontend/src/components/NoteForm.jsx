import React, { useState, useEffect } from "react";

export default function NoteForm({ onSubmit, editingNote, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("text");
  const [content, setContent] = useState(""); // for text
  const [checklist, setChecklist] = useState([{ text: "", done: false }]);
  const [files, setFiles] = useState([]);

  // Load editing note into form
  useEffect(() => {
    if (editingNote) {
      setTitle(editingNote.title);
      setType(editingNote.type);
      if (editingNote.type === "text") setContent(editingNote.content);
      else if (editingNote.type === "checklist") setChecklist(editingNote.content);
      else if (editingNote.type === "file") setFiles(editingNote.content || []);
    } else {
      setTitle("");
      setType("text");
      setContent("");
      setChecklist([{ text: "", done: false }]);
      setFiles([]);
    }
  }, [editingNote]);

  const handleAddChecklistItem = () => {
    setChecklist([...checklist, { text: "", done: false }]);
  };

  const handleChecklistChange = (index, value) => {
    const newChecklist = [...checklist];
    newChecklist[index].text = value;
    setChecklist(newChecklist);
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map((file) => ({
      name: file.name,
      url: URL.createObjectURL(file), // for demo, real app should upload to server
    }));
    setFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let noteContent;
    if (type === "text") noteContent = content;
    else if (type === "checklist") noteContent = checklist;
    else if (type === "file") noteContent = files;

    onSubmit({
      id: editingNote?.id,
      title,
      type,
      content: noteContent,
      color: "#f5f5f5",
    });

    // reset form
    setTitle("");
    setType("text");
    setContent("");
    setChecklist([{ text: "", done: false }]);
    setFiles([]);
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc" }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={(e) => setTitle(e.target.value)}
      />
      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="text">Text</option>
        <option value="checklist">Checklist</option>
        <option value="file">File</option>
      </select>

      {type === "text" && (
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      )}

      {type === "checklist" && (
        <div>
          {checklist.map((item, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Item ${index + 1}`}
              value={item.text}
              onChange={(e) => handleChecklistChange(index, e.target.value)}
            />
          ))}
          <button type="button" onClick={handleAddChecklistItem}>Add Item</button>
        </div>
      )}

      {type === "file" && (
        <input type="file" multiple onChange={handleFileChange} />
      )}

      <button type="submit">{editingNote ? "Update" : "Create"} Note</button>
      {editingNote && <button type="button" onClick={onCancelEdit}>Cancel</button>}
    </form>
  );
}
