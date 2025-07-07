import React, { useEffect, useRef, useState } from "react";
import "./Homepage.css";
import bgBooks from "../assets/background-books.jpg";

/**
 * PUBLIC_INTERFACE
 * Homepage: Landing page introducing the app and allowing navigation to explore genres and features.
 * Updated to display only a single, well-aligned, responsive hero image.
 */
function Homepage({ navigate }) {
  // Rotating literary quotes data
  const literaryQuotes = [
    {
      text: "A reader lives a thousand lives before he dies. — George R. R. Martin",
      author: "George R. R. Martin",
    },
    {
      text: "So many books, so little time. — Frank Zappa",
      author: "Frank Zappa",
    },
    {
      text: "There is no friend as loyal as a book. — Ernest Hemingway",
      author: "Ernest Hemingway",
    },
    {
      text: "Books are a uniquely portable magic. — Stephen King",
      author: "Stephen King",
    },
    {
      text: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking. — Haruki Murakami",
      author: "Haruki Murakami",
    }
  ];

  // Rotating quote state/logic
  const [quoteIdx, setQuoteIdx] = useState(0);
  const quoteTimer = useRef();

  useEffect(() => {
    quoteTimer.current = setInterval(() => {
      setQuoteIdx(prev =>
        prev + 1 < literaryQuotes.length ? prev + 1 : 0
      );
    }, 4500);
    return () => clearInterval(quoteTimer.current);
    // eslint-disable-next-line
  }, []);

  const handleContinue = () => {
    if (navigate) navigate("/explore");
  };

  // Only one hero image from local assets (background-books.jpg)
  // We'll reuse this as both the page background (as in App.js) and as a hero illustration.
  // The hero image below the headline
  return (
    <section
      className="homepage-bg"
      style={{
        background: `url(${bgBooks}) center/cover no-repeat fixed`
      }}
    >
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
        <img
          src={bgBooks}
          className="hero-homepage-img"
          alt="Books illustration"
          draggable="false"
          style={{
            maxWidth: "370px",
            width: "90vw",
            minWidth: "120px",
            maxHeight: "210px",
            borderRadius: "16px",
            marginBottom: "2.2rem",
            boxShadow: "0 10px 28px rgba(80,80,120,0.13), 0 2px 9px rgba(66,60,80,0.09)",
            objectFit: "cover"
          }}
        />
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

        {/* Literary Quotes Section */}
        <div className="homepage-quotes-area" aria-live="polite">
          <figure key={quoteIdx} className="homepage-quote animated-quote">
            <blockquote>
              <span className="quote-mark" aria-hidden="true">“</span>
              {literaryQuotes[quoteIdx].text.replace(/^[“"]|[”"]$/g, "")}
              <span className="quote-mark" aria-hidden="true">”</span>
            </blockquote>
            <figcaption>
              — <span className="homepage-quote-author">{literaryQuotes[quoteIdx].author}</span>
            </figcaption>
          </figure>
        </div>

        <button
          className="theme-toggle homepage-cta-btn-animate"
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
