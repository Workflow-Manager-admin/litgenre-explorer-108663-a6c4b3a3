import React from "react";
import "./BookGrid.css";
import BookCard from "./BookCard";

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
    <div className="book-grid">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
}

export default BookGrid;
