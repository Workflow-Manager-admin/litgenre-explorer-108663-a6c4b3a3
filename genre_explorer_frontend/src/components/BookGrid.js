import React from "react";

/**
 * BookGrid displays a responsive grid of book cards.
 * @param {Object[]} books - Array of book objects from Google Books API.
 * @param {string} loadingMessage - Message to show while loading.
 * @param {string} errorMessage - Message to show if there's an error.
 */
 // PUBLIC_INTERFACE
function BookGrid({ books, loadingMessage, errorMessage }) {
  if (loadingMessage) {
    return (
      <div style={{ margin: "32px auto", color: "var(--text-secondary)" }}>
        {loadingMessage}
      </div>
    );
  }
  if (errorMessage) {
    return (
      <div
        style={{
          margin: "32px auto",
          color: "#c62828",
          fontWeight: "bold"
        }}
      >
        {errorMessage}
      </div>
    );
  }

  if (!books || books.length === 0) {
    return (
      <div style={{ margin: "32px auto", color: "var(--text-secondary)" }}>
        No books to display.
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "24px",
        padding: "32px 16px",
        maxWidth: "1080px",
        margin: "0 auto"
      }}
    >
      {books.map((book) => (
        <div
          key={book.id}
          style={{
            background: "var(--bg-secondary, #f8f9fa)",
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(80,80,80,0.09)",
            padding: 18,
            textAlign: "left",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minHeight: 320
          }}
        >
          <img
            src={
              book.volumeInfo.imageLinks?.thumbnail ||
              "https://via.placeholder.com/128x192?text=No+Cover"
            }
            alt={book.volumeInfo.title + " cover"}
            style={{
              width: 128,
              height: 192,
              objectFit: "cover",
              marginBottom: 12,
              borderRadius: 7,
              boxShadow: "0 1px 4px rgba(0,0,0,0.08)"
            }}
          />
          <div style={{ fontWeight: 700, fontSize: "1.05rem", margin: "6px 0", color: "var(--text-primary)" }}>
            {book.volumeInfo.title}
          </div>
          <div style={{ fontSize: "0.97rem", color: "var(--text-secondary)", marginBottom: 4 }}>
            {(book.volumeInfo.authors || []).join(", ")}
          </div>
          <div style={{ fontSize: "0.92rem", color: "var(--text-secondary)", marginBottom: 10, textAlign: "center" }}>
            {book.volumeInfo.publishedDate ? `(${book.volumeInfo.publishedDate})` : ""}
          </div>
          <a
            href={book.volumeInfo.previewLink}
            className="App-link"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              marginTop: "auto",
              fontWeight: 500,
              fontSize: "0.95rem"
            }}
          >
            Preview
          </a>
        </div>
      ))}
    </div>
  );
}

export default BookGrid;
