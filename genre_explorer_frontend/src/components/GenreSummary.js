import React, { useEffect, useState } from "react";
import "./GenreSummary.css";

/**
 * PUBLIC_INTERFACE
 * GenreSummary: Fetches and displays a brief Wikipedia summary for the selected literary genre.
 * @param {string} genre - The currently selected genre (from parent/App).
 */
function GenreSummary({ genre }) {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!genre) {
      setSummary("");
      setError("");
      return;
    }

    // Wikipedia API for short description:
    // Using REST API: https://en.wikipedia.org/api/rest_v1/page/summary/{title}
    setLoading(true);
    setError("");
    setSummary("");

    // Some genres with spaces/apos may need adjustments to Wikipedia title
    const wikiTitle = encodeURIComponent(genre.replace(/'/g, "%27") + " (literature)");
    const fallbackWikiTitle = encodeURIComponent(genre);

    // Try with "(literature)" first, then fallback if not found
    fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${wikiTitle}`)
      .then(res => {
        if (res.status === 404) {
          // Try basic genre name if "(literature)" not available
          return fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${fallbackWikiTitle}`);
        }
        return res;
      })
      .then(res => res.json())
      .then(data => {
        if (data.extract) {
          setSummary(data.extract.length > 400 ? data.extract.slice(0, 390) + "..." : data.extract);
        } else {
          setError("No summary found.");
        }
        setLoading(false);
      })
      .catch(() => {
        setSummary("");
        setError("Could not fetch summary.");
        setLoading(false);
      });
  }, [genre]);

  if (!genre) {
    return null;
  }

  return (
    <section className="genre-summary-panel" data-testid="genre-summary-panel">
      <h2 className="genre-summary-title">
        <span role="img" aria-label="info">📚</span>&nbsp;About <span className="genre-name">{genre}</span>
      </h2>
      {loading ? (
        <div className="genre-summary-loading">Loading summary...</div>
      ) : error ? (
        <div className="genre-summary-error">{error}</div>
      ) : (
        <div className="genre-summary-text">{summary}</div>
      )}
    </section>
  );
}

export default GenreSummary;
