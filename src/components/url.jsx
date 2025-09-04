import React, { useState } from "react";

export default function UrlForm({ onAdd }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl: url }),
      });

      const data = await res.json();
      onAdd({
        original: data.originalUrl,
        short: data.shortUrl,
      });
      setUrl("");
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6 flex gap-2 max-w-lg w-full">
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Paste your long URL here"
        className="flex-1 px-4 py-2 rounded-lg border"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700"
      >
        {loading ? "Shortening..." : "Shorten URL"}
      </button>
    </form>
  );
}