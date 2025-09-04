import React, { useState, useEffect } from "react";
import UrlForm from "../components/Url";
import LinkList from "../components/linklist";

export default function Home() {
  const [links, setLinks] = useState([]);
  useEffect(() => {
    const saved = Object.values(localStorage).map((val) => JSON.parse(val));
    setLinks(saved);
  }, []);

  const handleAdd = (newLink) => {
    setLinks([newLink, ...links]);
  };

  const handleClickLink = (link) => {
    const updated = {
      ...link,
      clicks: link.clicks + 1,
      details: [
        ...link.details,
        {
          time: new Date().toISOString(),
          referrer: document.referrer || "Direct",
          location: "Local Browser",
        },
      ],
    };
    localStorage.setItem(link.short.split("/").pop(), JSON.stringify(updated));
    setLinks((prev) =>
      prev.map((l) => (l.short === link.short ? updated : l))
    );
    window.open(link.original, "_blank");
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <UrlForm onAdd={handleAdd} />
      <LinkList links={links} onClickLink={handleClickLink} />
    </div>
  );
}
