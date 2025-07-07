import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GenreSelector from './components/GenreSelector';
import BookGridContainer from './components/BookGridContainer';
import GenreSummary from './components/GenreSummary';

/**
 * Main App component. Manages theme, selected genre, and delegates data fetching to container components.
 */
// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [selectedGenre, setSelectedGenre] = useState('');

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
  };

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <div className="App">
      <header className="App-header" style={{ paddingBottom: 32, paddingTop: 24 }}>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
        <img src={logo} className="App-logo" alt="logo" />
        <h1
          style={{
            margin: '12px 0 0 0',
            fontWeight: 700,
            fontSize: '2rem',
            letterSpacing: '0.01em',
            color: 'var(--text-primary)'
          }}
        >
          LitGenre Explorer
        </h1>
        <GenreSelector selectedGenre={selectedGenre} onSelectGenre={handleGenreChange} />
        <p>
          {selectedGenre ? (
            <>
              Selected genre:&nbsp;
              <strong style={{ color: 'var(--text-secondary)' }}>
                {selectedGenre}
              </strong>
            </>
          ) : (
            <span style={{ color: 'var(--text-secondary)' }}>Please select a genre above.</span>
          )}
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
        <BookGridContainer genre={selectedGenre} />
      </main>
    </div>
  );
}

export default App;
