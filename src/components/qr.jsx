import React, { useState } from "react";
import QRCode from "react-qr-code";
import { QrCode } from "lucide-react";

export default function QrModal({ url }) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 text-sm bg-gray-200 rounded-lg hover:bg-gray-300 flex items-center gap-1"
      >
        <QrCode className="w-4 h-4" /> QR
      </button>

      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl shadow-lg relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✖
            </button>
            <QRCode value={url} size={180} />
            <p className="mt-3 text-center text-sm text-gray-700">{url}</p>
          </div>
        </div>
      )}
    </div>
  );
}
