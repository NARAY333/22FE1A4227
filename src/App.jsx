import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import UrlForm from "./components/Url";
import LinkList from "./components/linklist";
import Stats from "./pages/stats";
import { useState } from "react";

function Navbar() {
  const location = useLocation();
  return (
    <div className="navbar">
      <Link to="/" className={location.pathname === "/" ? "active" : ""}>
        Home
      </Link>
      <Link to="/stats" className={location.pathname === "/stats" ? "active" : ""}>
        Statistics
      </Link>
    </div>
  );
}

export default function App() {
  const [links, setLinks] = useState([]);

  const addLink = (link) => {
    setLinks([...links, link]);
  };

  const recordClick = (short) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.short === short
          ? {
              ...link,
              clicks: link.clicks + 1,
              details: [
                ...link.details,
                {
                  time: Date.now(),
                  referrer: document.referrer || "Direct",
                  location: "Unknown",
                },
              ],
            }
          : link
      )
    );
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<>
          <UrlForm onAdd={addLink} />
          <LinkList links={links} onClickLink={recordClick} />
        </>} />
        <Route path="/stats" element={<Stats links={links} />} />
      </Routes>
    </Router>
  );
}
