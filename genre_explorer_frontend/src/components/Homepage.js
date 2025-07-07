import React, { useEffect, useRef, useState } from "react";
import "./Homepage.css";
import bgBooks from "../assets/background-books.jpg";

/**
 * PUBLIC_INTERFACE
 * Homepage: Enhanced landing page with hero section, animated call-to-action, and rotating quotes/testimonials.
 * Features:
 * - Hero (header) with parallax image background and headline
 * - High-visibility stylized CTA button (keyboard and screenreader accessible)
 * - Responsive design with testimonials/quotes section below hero
 * - Accessible, clean, and visually appealing
 */
function Homepage({ navigate }) {
  // Literary quotes/testimonials (rotating carousel)
  const literaryQuotes = [
    {
      text: "A reader lives a thousand lives before he dies.",
      author: "George R. R. Martin"
    },
    {
      text: "So many books, so little time.",
      author: "Frank Zappa"
    },
    {
      text: "There is no friend as loyal as a book.",
      author: "Ernest Hemingway"
    },
    {
      text: "Books are a uniquely portable magic.",
      author: "Stephen King"
    },
    {
      text: "If you only read the books that everyone else is reading, you can only think what everyone else is thinking.",
      author: "Haruki Murakami"
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
    }, 4800);
    return () => clearInterval(quoteTimer.current);
    // eslint-disable-next-line
  }, []);

  // Subtle parallax effect for hero background as user scrolls (mobile-optimized, no jank)
  useEffect(() => {
    const hero = document.querySelector('.homepage-hero-parallax');
    function handleScroll() {
      // Parallax: move background y-position slower than scroll
      if (!hero) return;
      const scrollY = window.scrollY || window.pageYOffset || 0;
      hero.style.backgroundPositionY = `${Math.max(-scrollY * 0.25, -44)}px`;
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContinue = () => {
    if (navigate) navigate("/explore");
  };

  // Only one hero image from local assets (background-books.jpg)
  // The hero image is background + illustration + heading overlayed.
  return (
    <div className="homepage-root">
      {/* HERO SECTION */}
      <section
        className="homepage-hero-parallax"
        style={{
          backgroundImage: `url(${bgBooks})`,
        }}
        aria-label="Literary genres hero image"
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <h1 className="homepage-title" tabIndex={0}>
            <span className="title-main">Explore </span>
            <span className="title-highlight">Genres</span>
            <span className="title-main">, Discover</span>
            <span className="title-accent"> Books.</span>
          </h1>
          <p className="homepage-subtitle">
            Find your next favorite read. Start your journey through the world of literature with <b>LitGenre Explorer</b>.
          </p>
          <button
            className="homepage-cta-btn homepage-cta-btn-animate"
            onClick={handleContinue}
            aria-label="Explore genres"
            tabIndex={0}
          >
            Explore Genres →
          </button>
        </div>
      </section>

      {/* QUOTES / TESTIMONIAL SECTION */}
      <section className="homepage-quotes-area" aria-label="Literary quotes and testimonials">
        <figure key={quoteIdx} className="homepage-quote animated-quote" aria-live="polite">
          <blockquote>
            <span className="quote-mark" aria-hidden="true">“</span>
            {literaryQuotes[quoteIdx].text}
            <span className="quote-mark" aria-hidden="true">”</span>
          </blockquote>
          <figcaption>
            — <span className="homepage-quote-author">{literaryQuotes[quoteIdx].author}</span>
          </figcaption>
        </figure>
      </section>
    </div>
  );
}

export default Homepage;
