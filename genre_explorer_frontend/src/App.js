import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import GenreSelector from './components/GenreSelector';

// PUBLIC_INTERFACE
function App() {
  const [theme, setTheme] = useState('light');
  const [selectedGenre, setSelectedGenre] = useState('');

  // Effect to apply theme to document element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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
    </div>
  );
}

export default App;
