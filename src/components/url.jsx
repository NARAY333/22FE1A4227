import React, { useState } from "react";
import { Link as LinkIcon, LoaderCircle } from "lucide-react";

export default function UrlForm({ onAdd }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return;

    setLoading(true);

    const code = Math.random().toString(36).substring(2, 8);
    const newLink = {
      short: `${window.location.origin}/${code}`,
      original: url,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      clicks: 0,
      details: [],
    };
    localStorage.setItem(code, JSON.stringify(newLink));

    onAdd(newLink);
    setUrl("");
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-xl shadow-md flex w-full max-w-lg"
    >
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Enter your URL..."
        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        required
      />
      <button
        type="submit"
        disabled={loading}
        className="ml-3 px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50"
      >
        {loading ? (
          <LoaderCircle className="w-5 h-5 animate-spin" />
        ) : (
          <LinkIcon className="w-5 h-5" />
        )}
        Shorten
      </button>
    </form>
  );
}
