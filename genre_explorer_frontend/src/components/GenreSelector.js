import React from 'react';
import './GenreSelector.css';

// A static list of literary genres for selection
const GENRES = [
  'Fantasy',
  'Science Fiction',
  'Mystery',
  'Romance',
  'Historical',
  'Horror',
  'Thriller',
  'Non-Fiction',
  'Biography',
  'Children\'s',
  'Young Adult',
  'Poetry',
  'Drama',
  'Classic',
  'Comics',
];

// PUBLIC_INTERFACE
function GenreSelector({ selectedGenre, onSelectGenre }) {
  /**
   * Accessible dropdown for selecting a literary genre.
   * @param selectedGenre (string) - the currently selected genre
   * @param onSelectGenre (function) - function called when genre changes
   */
  return (
    <div className="genre-selector-container">
      <label htmlFor="genre-dropdown" className="genre-label">
        Choose a Genre:
      </label>
      <select
        id="genre-dropdown"
        value={selectedGenre}
        onChange={e => onSelectGenre(e.target.value)}
        className="genre-dropdown"
        aria-label="Select literary genre"
      >
        <option value="" disabled>
          -- Select Genre --
        </option>
        {GENRES.map(genre => (
          <option value={genre} key={genre}>
            {genre}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreSelector;
