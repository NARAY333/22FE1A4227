import React from "react";
import QrModal from "./Qr";

export default function LinkList({ links }) {
  if (!links.length) {
    return <p className="mt-6 text-gray-500">No links yet. Try shortening one!</p>;
  }

  return (
    <div className="mt-6 w-full max-w-lg space-y-4">
      {links.map((link, i) => (
        <div
          key={i}
          className="bg-white p-4 rounded-xl shadow-md flex justify-between items-center"
        >
          <div>
            <p className="text-sm text-gray-700">{link.original}</p>
            <a
              href={link.short}
              target="_blank"
              rel="noreferrer"
              className="text-indigo-600 font-semibold hover:underline"
            >
              {link.short}
            </a>
          </div>
          <QrModal url={link.short} />
        </div>
      ))}
    </div>
  );
}
