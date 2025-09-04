import React from "react";

export default function LinkList({ links, onClickLink }) {
  if (links.length === 0) {
    return <p className="no-data">No shortened URLs yet.</p>;
  }

  return (
    <div className="link-list">
      {links.map((link, index) => (
        <div key={index} className="link-card">
          <p>
            <strong>Shortened:</strong>{" "}
            <a
              href={link.original}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onClickLink(link.short)}
            >
              {window.location.origin}/{link.short}
            </a>
          </p>
          <p>
            <strong>Original:</strong>{" "}
            <a href={link.original} target="_blank" rel="noopener noreferrer">
              {link.original}
            </a>
          </p>
        </div>
      ))}
    </div>
  );
}
