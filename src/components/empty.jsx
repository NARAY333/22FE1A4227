import React from "react";

export default function EmptyState() {
  return (
    <div className="rounded-2xl border border-dashed p-8 text-center text-sm text-zinc-500 bg-white">
      No links yet. Paste a long URL above and click <span className="font-medium text-zinc-900">Shorten URL</span>.
    </div>
  );
}
