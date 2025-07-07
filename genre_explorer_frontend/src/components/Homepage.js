import React from "react";
import GenreSelector from "./GenreSelector";

/**
 * PUBLIC_INTERFACE
 * Homepage: Landing page introducing the app and allowing navigation to explore genres.
 * @param {string} selectedGenre
 * @param {function} onSelectGenre
 * @param {function} navigate
 */
function Homepage({ selectedGenre, onSelectGenre, navigate }) {
  const handleContinue = () => {
    navigate("/explore");
  };

  return (
    <section style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2.5rem 0.5rem 2.5rem 0.5rem",
      maxWidth: 820,
      margin: "0 auto",
    }}>
      <h2 style={{
        fontWeight: 800,
        fontSize: "2.2rem",
        marginBottom: "1rem",
        color: "var(--secondary)",
        letterSpacing: "0.01em"
      }}>
        Welcome to <span style={{ color: "var(--accent)" }}>LitGenre Explorer</span>!
      </h2>
      <p style={{
        maxWidth: 540,
        margin: "0 0 2.2rem 0",
        fontSize: "1.15rem",
        color: "var(--text-primary)",
        lineHeight: 1.57,
        textAlign: "center"
      }}>
        Discover the world of literature by exploring popular genres and influential books.
        Select a genre below and then click <b>Explore</b> to view book recommendations and insightful genre summaries.
      </p>
      <GenreSelector selectedGenre={selectedGenre} onSelectGenre={onSelectGenre} />
      <button
        className="theme-toggle"
        style={{
          marginTop: 30,
          maxWidth: 200,
          fontWeight: 700,
          fontSize: "1.13rem",
        }}
        onClick={handleContinue}
        disabled={!selectedGenre}
        aria-disabled={!selectedGenre}
      >
        {selectedGenre ? "Explore Genre →" : "Choose a Genre"}
      </button>
    </section>
  );
}

export default Homepage;
