import React, { useState } from "react";
import UrlForm from "../components/Url";
import LinkList from "../components/linklist";

export default function Home() {
  const [links, setLinks] = useState([]);

  return (
    <div className="flex flex-col items-center space-y-6">
      <UrlForm onAdd={(newLink) => setLinks([newLink, ...links])} />
      <LinkList links={links} />
    </div>
  );
}
