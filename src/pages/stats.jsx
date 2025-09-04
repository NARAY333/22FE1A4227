import React, { useEffect, useState } from "react";

export default function Stats() {
  const [links, setLinks] = useState([]);
  const fetchStats = async () => {
    try {
      const res = await fetch("http://localhost:3000/stats");
      const data = await res.json();
      setLinks(data);
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">📊 URL Shortener Statistics</h1>

      {links.length === 0 && <p className="text-gray-500">No data yet.</p>}

      {links.map((link, idx) => (
        <div key={idx} className="bg-white p-4 rounded-xl shadow-md mb-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-indigo-600 font-semibold">{link.short}</p>
              <p className="text-gray-500 text-sm">Original: {link.original}</p>
              <p className="text-gray-400 text-xs">
                Created: {new Date(link.createdAt).toLocaleString()} | Expires:{" "}
                {new Date(link.expiresAt).toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold">{link.clicks} clicks</p>
            </div>
          </div>

          <details className="mt-3">
            <summary className="cursor-pointer text-indigo-500">
              View click details
            </summary>
            <ul className="mt-2 space-y-1 text-sm">
              {link.details.map((d, i) => (
                <li key={i} className="border-b pb-1">
                  <span className="font-medium">
                    {new Date(d.time).toLocaleString()}
                  </span>{" "}
                  — {d.referrer} ({d.location})
                </li>
              ))}
            </ul>
          </details>
        </div>
      ))}
    </div>
  );
}
