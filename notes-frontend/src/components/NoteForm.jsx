import React, { useState, useEffect } from "react";

export default function NoteForm({ onSubmit, editingNote, onCancelEdit }) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("text");
  const [content, setContent] = useState("");
  const [checklist, setChecklist] = useState([{ text: "", done: false }]);
  const [files, setFiles] = useState([]);

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

  const handleAddChecklistItem = () => setChecklist([...checklist, { text: "", done: false }]);
  const handleChecklistChange = (index, value) => {
    const newChecklist = [...checklist];
    newChecklist[index].text = value;
    setChecklist(newChecklist);
  };
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files).map(file => ({
      name: file.name,
      url: URL.createObjectURL(file) // replace with server upload URL in real app
    }));
    setFiles(selectedFiles);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let noteContent = type === "text" ? content : type === "checklist" ? checklist : files;
    onSubmit({
      id: editingNote?.id,
      title,
      type,
      content: noteContent,
      color: "#f5f5f5"
    });
    setTitle(""); setType("text"); setContent(""); setChecklist([{ text: "", done: false }]); setFiles([]);
    if (onCancelEdit) onCancelEdit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        marginBottom: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
      }}
    >
      <input
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "14px"
        }}
        type="text"
        placeholder="Title"
        value={title}
        required
        onChange={e => setTitle(e.target.value)}
      />
      <select
        style={{
          width: "100%",
          padding: "10px",
          marginBottom: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          fontSize: "14px"
        }}
        value={type}
        onChange={e => setType(e.target.value)}
      >
        <option value="text">Text</option>
        <option value="checklist">Checklist</option>
        <option value="file">File</option>
      </select>

      {type === "text" && (
        <textarea
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            fontSize: "14px",
            height: "80px"
          }}
          placeholder="Content"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
      )}

      {type === "checklist" && (
        <div style={{ marginBottom: "10px" }}>
          {checklist.map((item, index) => (
            <input
              key={index}
              type="text"
              placeholder={`Item ${index + 1}`}
              value={item.text}
              onChange={e => handleChecklistChange(index, e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                marginBottom: "5px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "14px"
              }}
            />
          ))}
          <button
            type="button"
            onClick={handleAddChecklistItem}
            style={{
              padding: "6px 12px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#1976d2",
              color: "#fff",
              cursor: "pointer",
              marginTop: "5px"
            }}
          >
            Add Item
          </button>
        </div>
      )}

      {type === "file" && (
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          style={{ marginBottom: "10px" }}
        />
      )}

      <div>
        <button
          type="submit"
          style={{
            padding: "8px 15px",
            borderRadius: "4px",
            border: "none",
            backgroundColor: "#1976d2",
            color: "#fff",
            cursor: "pointer",
            marginRight: "10px"
          }}
        >
          {editingNote ? "Update" : "Create"} Note
        </button>
        {editingNote && (
          <button
            type="button"
            onClick={onCancelEdit}
            style={{
              padding: "8px 15px",
              borderRadius: "4px",
              border: "none",
              backgroundColor: "#ccc",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
