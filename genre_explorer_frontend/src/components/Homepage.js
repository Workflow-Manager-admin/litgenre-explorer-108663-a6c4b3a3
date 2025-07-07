import React from "react";
import "./Homepage.css";
import bgBooks from "../assets/background-books.jpg";

/**
 * PUBLIC_INTERFACE
 * Homepage: Landing page introducing the app and allowing navigation to explore genres and features.
 * This homepage should NOT include any genre selection or routing logic other than a button to explore genres.
 */
function Homepage({ navigate }) {
  const handleContinue = () => {
    if (navigate) {
      navigate("/explore");
    }
  };

  return (
    <section
      className="homepage-bg"
      style={{
        background: `url(${bgBooks}) center/cover no-repeat fixed`
      }}
    >
      {/* Decorative Images */}
      <img
        src="/stacked-books.svg"
        className="hp-illustration"
        alt="Stack of books illustration"
        aria-hidden="true"
        tabIndex={-1}
        draggable="false"
      />
      <img
        src="/reader-decor.svg"
        className="hp-reader"
        alt="Person reading book decor"
        aria-hidden="true"
        tabIndex={-1}
        draggable="false"
      />
      <div className="homepage-content">
        <h2 style={{
          fontWeight: 800,
          fontSize: "2.2rem",
          marginBottom: "1rem",
          color: "var(--secondary)",
          letterSpacing: "0.01em",
          textShadow: "0 2px 15px rgba(110,110,180,0.07)"
        }}>
          Welcome to <span style={{ color: "var(--accent)" }}>LitGenre Explorer</span>!
        </h2>
        <p style={{
          maxWidth: 540,
          margin: "0 0 2.2rem 0",
          fontSize: "1.15rem",
          color: "var(--text-primary)",
          lineHeight: 1.57,
          textAlign: "center",
          background: "rgba(254,254,255,0.81)",
          borderRadius: 7,
          padding: "12px 10px",
          boxShadow: "0 4px 16px rgba(90,99,120,0.07)"
        }}>
          Discover the world of literature by exploring popular genres and influential books.
          Jump into the <b>Explore</b> section to find book recommendations and insightful genre summaries.
        </p>
        <button
          className="theme-toggle"
          style={{
            marginTop: 36,
            maxWidth: 220,
            fontWeight: 700,
            fontSize: "1.13rem",
          }}
          onClick={handleContinue}
        >
          Explore Genres →
        </button>
      </div>
    </section>
  );
}

export default Homepage;
