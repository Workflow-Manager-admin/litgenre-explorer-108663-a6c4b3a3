import React from "react";
import "./BookGrid.css";

/**
 * PUBLIC_INTERFACE
 * BookCard displays a single book's details in a clickable, responsive card.
 * @param {Object} book - Google Books API book object.
 * @param {function} [onClick] - Optional click handler.
 */
function BookCard({ book, onClick }) {
  const info = book.volumeInfo || {};
  const {
    title,
    authors,
    description,
    publishedDate,
    imageLinks,
    previewLink,
  } = info;

  // Clean description - max 220 chars for grid, strip HTML if present
  let desc = (description || "").replace(/<[^>]+>/g, "");
  if (desc.length > 220) desc = desc.slice(0, 206).trimEnd() + "…";

  const cover =
    imageLinks?.thumbnail ||
    "https://via.placeholder.com/128x192?text=No+Cover";

  // Click opens Google Books preview in a new tab
  const handleCardClick = (e) => {
    // Prevent a nested <a> click from bubbling up
    if (e.target.tagName.toLowerCase() === "a") return;
    if (previewLink) window.open(previewLink, "_blank", "noopener noreferrer");
    if (onClick) onClick(book);
  };

  return (
    <div
      className="book-card"
      tabIndex={0}
      role="button"
      aria-label={
        "Preview book: " +
        (title || "Book") +
        (authors ? " by " + authors.join(", ") : "")
      }
      onClick={handleCardClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleCardClick(e);
      }}
    >
      <div className="book-cover-wrap">
        <img
          src={cover}
          alt={title + " cover"}
          className="book-cover"
          draggable="false"
        />
      </div>
      <div className="book-details">
        <div className="book-title">{title || "Untitled Book"}</div>
        <div className="book-authors">
          {authors ? authors.join(", ") : <em>Unknown author</em>}
        </div>
        {publishedDate && (
          <div className="book-date">({publishedDate})</div>
        )}
        {desc && <div className="book-description">{desc}</div>}
      </div>
      {previewLink && (
        <a
          className="book-preview-link"
          href={previewLink}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
        >
          Preview
        </a>
      )}
    </div>
  );
}

export default BookCard;
