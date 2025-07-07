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
function BookGrid({ books, loadingMessage, errorMessage, userBooks, onAddBookClick }) {
  // Combine fetched books with user-added books if any
  const allBooks = [
    ...(Array.isArray(books) ? books : []),
    ...(Array.isArray(userBooks) ? userBooks : []),
  ];

  if (onAddBookClick) {
    // AddBook FAB/sticky button for manual entry
    // Show it floating or at the top if grid isn't empty
    // Always visible
    // Mobile: stick to bottom right
  }

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

  // "Add Book" floating button (desktop+mobile friendly):
  // Shows at top-right or bottom on mobile
  // Use portal/modal in parent but handle button here for now
  const AddBookButton = onAddBookClick && (
    <button
      type="button"
      aria-label="Add a new book"
      className="theme-toggle"
      style={{
        position: "fixed",
        right: 28, bottom: 30,
        zIndex: 1200,
        borderRadius: "50%",
        width: 54, height: 54,
        fontSize: 28, fontWeight: 650,
        background: "var(--button-bg)",
        boxShadow: "0 4px 22px rgba(90,120,160,0.14)",
        padding: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onAddBookClick}
    >＋</button>
  );

  if (!allBooks || allBooks.length === 0) {
    return (
      <>
        <div style={{ margin: "32px auto", color: "var(--text-secondary)" }}>
          No books to display.
        </div>
        {AddBookButton}
      </>
    );
  }

  return (
    <>
      <div className="book-grid">
        {allBooks.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
      {AddBookButton}
    </>
  );
}

export default BookGrid;
