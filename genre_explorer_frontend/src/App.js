import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import GenreSelector from './components/GenreSelector';
import BookGridContainer from './components/BookGridContainer';
import GenreSummary from './components/GenreSummary';
import Homepage from './components/Homepage';

/**
 * Main App component with routing for homepage and genre explorer.
 */
// PUBLIC_INTERFACE
function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

/**
 * AppLayout renders different layouts based on route.
 */
function AppLayout() {
  const [theme, setTheme] = useState('light');
  const [selectedGenre, setSelectedGenre] = useState('');
  const navigate = useNavigate();

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  // PUBLIC_INTERFACE
  const handleGenreChange = (genre) => {
    setSelectedGenre(genre);
    // Optionally navigate to /explore, but if homepage holds selector, don't redirect
  };

  useEffect(() => {
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
        <Link to="/" style={{ textDecoration: 'none' }}>
          <h1
            className="app-title-accent"
            style={{
              margin: '12px 0 0 0',
              fontWeight: 700,
              fontSize: '2rem',
              letterSpacing: '0.01em'
            }}
          >
            <span className="lg-accent-primary">Lit</span>
            <span className="lg-accent-secondary">Genre</span>
            <span className="lg-accent-accent"> Explorer</span>
          </h1>
        </Link>
        <nav style={{ marginTop: 14 }}>
          <Link className="App-link" to="/" style={{ marginRight: 24 }}>
            Home
          </Link>
          <Link className="App-link" to="/explore">
            Explore
          </Link>
        </nav>
      </header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Homepage
                navigate={navigate}
              />
            }
          />
          <Route
            path="/explore"
            element={
              <GenreExplorer
                selectedGenre={selectedGenre}
                onSelectGenre={handleGenreChange}
              />
            }
          />
        </Routes>
      </main>
    </div>
  );
}

/**
 * GenreExplorer page component for genre selection/summary/books.
 */
// PUBLIC_INTERFACE
function GenreExplorer({ selectedGenre, onSelectGenre }) {
  return (
    <>
      <GenreSelector selectedGenre={selectedGenre} onSelectGenre={onSelectGenre} />
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
      <GenreSummary genre={selectedGenre} />
      <BookGridContainer genre={selectedGenre} />
    </>
  );
}

export default App;
