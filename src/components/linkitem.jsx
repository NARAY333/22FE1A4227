import React from "react";
import { Copy, ExternalLink, QrCode, Trash2 } from "lucide-react";

export default function LinkItem({ link, removeLink, setQrFor }) {
  function copyText(text) {
    navigator.clipboard.writeText(text);
  }

  return (
    <li className="bg-white rounded-2xl border shadow-sm p-4 flex flex-col sm:flex-row sm:items-center gap-3">
      <div className="flex-1 min-w-0">
        <p className="truncate font-medium">
          <a href={link.shortUrl} target="_blank" rel="noreferrer" className="hover:underline">{link.shortUrl}</a>
        </p>
        <p className="truncate text-sm text-zinc-600">{link.originalUrl}</p>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-zinc-500">
          <span>Created: {new Date(link.createdAt).toLocaleString()}</span>
          {link.alias && <span>Alias: <code>{link.alias}</code></span>}
          {link.expiresAt ? <span>Expires: {new Date(link.expiresAt).toLocaleString()}</span> : <span>Expires: never</span>}
        </div>
      </div>
      <div className="flex gap-2">
        <IconButton onClick={() => copyText(link.shortUrl)}><Copy className="h-4 w-4" /></IconButton>
        <IconButton onClick={() => window.open(link.shortUrl, "_blank")}><ExternalLink className="h-4 w-4" /></IconButton>
        <IconButton onClick={() => setQrFor(link)}><QrCode className="h-4 w-4" /></IconButton>
        <IconButton onClick={() => removeLink(link.code)}><Trash2 className="h-4 w-4" /></IconButton>
      </div>
    </li>
  );
}

function IconButton({ children, onClick }) {
  return (
    <button type="button" onClick={onClick} className="inline-flex items-center justify-center rounded-xl border px-3 py-2 hover:bg-zinc-50">
      {children}
    </button>
  );
}
