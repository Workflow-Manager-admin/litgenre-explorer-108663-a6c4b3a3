import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import GenreSelector from './components/GenreSelector';
import BookGrid from './components/BookGrid';
import GenreSummary from './components/GenreSummary';

/**
 * Main App component. Handles theme, genre selection, and book search/fetch/display.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [error, setError] = useState('');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Effect to fetch books from Google Books API when a genre is selected
  useEffect(() => {
    if (!selectedGenre) {
      setBooks([]);
      setError('');
      return;
    }
    // Fetch books based on selected genre
    setLoadingBooks(true);
    setError('');
    setBooks([]);

    // Google Books API: https://www.googleapis.com/books/v1/volumes?q=subject:{genre}&maxResults=16
    const query = encodeURIComponent(`subject:${selectedGenre}`);
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
      .catch((err) => {
        setLoadingBooks(false);
        setBooks([]);
        setError('Could not fetch books. Please try again later.');
      });
  }, [selectedGenre]);

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  return (
    <div className="App">
      <header className="App-header" style={{paddingBottom: 32, paddingTop: 24}}>
        <button 
          className="theme-toggle" 
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <h1 style={{
          margin: '12px 0 0 0',
          fontWeight: 700,
          fontSize: '2rem',
          letterSpacing: '0.01em',
          color: 'var(--text-primary)',
        }}>
          LitGenre Explorer
        </h1>
        <GenreSelector selectedGenre={selectedGenre} onSelectGenre={handleGenreChange} />
        <p>
          {selectedGenre
            ? (
              <>
                Selected genre:&nbsp;
                <strong style={{color: 'var(--text-secondary)'}}>
                  {selectedGenre}
                </strong>
              </>
            ) : (
              <span style={{color: 'var(--text-secondary)'}}>Please select a genre above.</span>
            )
          }
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <main>
        <GenreSummary genre={selectedGenre} />
        <BookGrid
          books={books}
          loadingMessage={loadingBooks ? "Loading books..." : ""}
          errorMessage={error}
        />
      </main>
    </div>
  );
}

export default App;
