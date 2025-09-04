import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import Stats from "./pages/stats";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="flex gap-4 mb-4">
          <Link to="/" className="text-indigo-600 font-semibold">Home</Link>
          <Link to="/stats" className="text-indigo-600 font-semibold">Statistics</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/stats" element={<Stats />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
