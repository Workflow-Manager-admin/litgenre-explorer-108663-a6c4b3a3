import React, { useState, useEffect } from "react";
import BookGrid from "./BookGrid";
import AddBookModal from "./AddBookModal";

/**
 * PUBLIC_INTERFACE
 * Container for BookGrid. Fetches books from Google Books API for a given genre,
 * manages loading/error state, and delegates render to presentational BookGrid.
 * @param {string} genre - The active selected genre.
 */
function BookGridContainer({ genre }) {
  const [books, setBooks] = useState([]);
  const [userBooks, setUserBooks] = useState([]); // local books for current genre
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [error, setError] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    // Reset user books when genre changes
    setUserBooks([]);
    if (!genre) {
      setBooks([]);
      setError('');
      return;
    }
    setLoadingBooks(true);
    setError('');
    setBooks([]);

    const query = encodeURIComponent(`subject:${genre}`);
    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=16&printType=books&orderBy=relevance`;

    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Google Books API error');
        }
        return response.json();
      })
      .then((data) => {
        if (data.items && Array.isArray(data.items)) {
          setBooks(data.items);
        } else {
          setBooks([]);
        }
        setLoadingBooks(false);
        setError('');
      })
      .catch(() => {
        setLoadingBooks(false);
        setBooks([]);
        setError('Could not fetch books. Please try again later.');
      });
  }, [genre]);

  // PUBLIC_INTERFACE
  const handleAddBook = (bookObj) => {
    // Only add book if it matches current genre
    if (
      !bookObj ||
      !bookObj.volumeInfo ||
      !bookObj.volumeInfo.genre ||
      bookObj.volumeInfo.genre.trim().toLowerCase() !== genre?.toLowerCase()
    ) {
      // Defensive, but the genre input is locked by default
      return;
    }
    setUserBooks((books) => [
      ...books,
      { ...bookObj, id: bookObj.id || "manual_" + Math.random().toString(36).slice(2, 9) },
    ]);
  };

  return (
    <>
      <BookGrid
        books={books}
        userBooks={userBooks}
        loadingMessage={loadingBooks ? "Loading books..." : ""}
        errorMessage={error}
        onAddBookClick={() => setShowAddModal(true)}
      />
      {showAddModal && (
        <AddBookModal
          open={showAddModal}
          onClose={() => setShowAddModal(false)}
          onAddBook={handleAddBook}
          defaultGenre={genre}
        />
      )}
    </>
  );
}

export default BookGridContainer;
