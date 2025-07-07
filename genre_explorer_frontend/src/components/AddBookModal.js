import React, { useState } from "react";

/**
 * PUBLIC_INTERFACE
 * AddBookModal is a modal dialog for entering book details manually.
 * @param {boolean} open - Control modal visibility
 * @param {function} onClose - Called to request close
 * @param {function} onAddBook - Receives new book object
 */
function AddBookModal({ open, onClose, onAddBook, defaultGenre }) {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    coverUrl: "",
    previewLink: "",
    genre: defaultGenre || "",
  });
  const [error, setError] = useState("");

  if (!open) return null;

  // PUBLIC_INTERFACE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.author || !form.genre) {
      setError("Title, author, and genre are required.");
      return;
    }
    onAddBook({
      id: "manual_" + Math.random().toString(36).slice(2, 9),
      volumeInfo: {
        title: form.title,
        authors: [form.author],
        description: form.description,
        imageLinks: { thumbnail: form.coverUrl || undefined },
        previewLink: form.previewLink || undefined,
        // Custom field for filtering
        genre: form.genre,
      },
      // You can store other metadata in the root if you want
      local: true,
    });
    setForm({
      title: "",
      author: "",
      description: "",
      coverUrl: "",
      previewLink: "",
      genre: defaultGenre || "",
    });
    setError("");
    if (onClose) onClose();
  };

  // Modal simple overlay styling, no external lib
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.32)",
        zIndex: 9999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-modal="true"
      role="dialog"
    >
      <div
        style={{
          width: "98vw",
          maxWidth: 420,
          background: "var(--bg-secondary, #fff)",
          borderRadius: 12,
          boxShadow: "0 4px 40px rgba(44,34,144,0.13)",
          padding: "36px 28px 22px 28px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 12,
            right: 16,
            fontSize: 22,
            border: "none",
            background: "transparent",
            color: "var(--text-secondary,#6C63FF)",
            cursor: "pointer",
          }}
          aria-label="Close add book modal"
          type="button"
        >
          ×
        </button>
        <h2
          style={{
            color: "var(--secondary)",
            margin: "0 0 16px 0",
            fontSize: "1.38rem",
            fontWeight: 700,
          }}
        >
          Add a New Book
        </h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          <label style={labelStyle}>
            Title<span style={required}>*</span>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              style={inputStyle}
              required
              maxLength={128}
              autoFocus
            />
          </label>
          <label style={labelStyle}>
            Author<span style={required}>*</span>
            <input
              type="text"
              name="author"
              value={form.author}
              onChange={handleChange}
              style={inputStyle}
              required
              maxLength={64}
            />
          </label>
          <label style={labelStyle}>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              style={{ ...inputStyle, minHeight: 52, fontFamily: "inherit", resize: "vertical" }}
              maxLength={800}
              rows={3}
            />
          </label>
          <label style={labelStyle}>
            Cover Image URL
            <input
              type="url"
              name="coverUrl"
              value={form.coverUrl}
              onChange={handleChange}
              style={inputStyle}
              placeholder="https://..."
              maxLength={240}
              inputMode="url"
            />
          </label>
          <label style={labelStyle}>
            Preview Link
            <input
              type="url"
              name="previewLink"
              value={form.previewLink}
              onChange={handleChange}
              style={inputStyle}
              placeholder="https://..."
              maxLength={240}
              inputMode="url"
            />
          </label>
          <label style={labelStyle}>
            Genre<span style={required}>*</span>
            <input
              type="text"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              style={inputStyle}
              required
              maxLength={32}
              placeholder="e.g. Fantasy"
              readOnly={!!defaultGenre}
            />
          </label>
          {error && (
            <div style={{ color: "#c62828", marginBottom: 7, marginTop: 4, fontWeight: 500 }}>
              {error}
            </div>
          )}
          <button
            type="submit"
            className="theme-toggle"
            style={{
              width: "100%",
              marginTop: 16,
              fontWeight: 750,
              fontSize: "1.13rem",
              letterSpacing: "0.01em",
              padding: "10px 0",
              borderRadius: 7.5,
            }}
          >
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block",
  fontWeight: 600,
  color: "var(--primary, #2D2D2D)",
  marginBottom: 9,
  letterSpacing: "0.006em",
  fontSize: "1.02rem",
};

const inputStyle = {
  width: "100%",
  border: "1.2px solid var(--border-color, #e4e7ec)",
  borderRadius: 7,
  fontSize: "1rem",
  padding: "7px 10px",
  margin: "2px 0 11px 0",
  background: "var(--bg-primary,#fafbfc)",
  color: "var(--primary,#2D2D2D)",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const required = {
  color: "var(--accent, #FF6F61)",
  marginLeft: 3,
  fontWeight: 700,
};

export default AddBookModal;
