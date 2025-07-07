import React, { useState, useEffect } from "react";
import BookGrid from "./BookGrid";

/**
 * PUBLIC_INTERFACE
 * Container for BookGrid. Fetches books from Google Books API for a given genre,
 * manages loading/error state, and delegates render to presentational BookGrid.
 * @param {string} genre - The active selected genre.
 */
function BookGridContainer({ genre }) {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
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

  return (
    <BookGrid
      books={books}
      loadingMessage={loadingBooks ? "Loading books..." : ""}
      errorMessage={error}
    />
  );
}

export default BookGridContainer;
