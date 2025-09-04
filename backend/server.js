import express from "express";
import cors from "cors";
const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());
const urlDatabase = {};
app.post("/shorten", (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) {
    return res.status(400).json({ error: "Original URL required" });
  }
  const code = Math.random().toString(36).substring(2, 8);
  const createdAt = new Date();
  urlDatabase[code] = {
    originalUrl,
    createdAt,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days expiry
    clicks: 0,
    details: [],
  };
  res.json({
    originalUrl,
    shortUrl: `http://localhost:${PORT}/${code}`,
    code,
  });
});
app.get("/:code", (req, res) => {
  const { code } = req.params;
  const record = urlDatabase[code];
  if (!record) {
    return res.status(404).send("Short link not found");
  }
  record.clicks += 1;
  record.details.push({
    time: new Date().toISOString(),
    referrer: req.get("Referrer") || "Direct",
    location: req.ip || "Unknown",
  });

  res.redirect(record.originalUrl);
});
app.get("/stats", (req, res) => {
  const stats = Object.entries(urlDatabase).map(([code, data]) => ({
    short: `http://localhost:${PORT}/${code}`,
    original: data.originalUrl,
    createdAt: data.createdAt,
    expiresAt: data.expiresAt,
    clicks: data.clicks,
    details: data.details,
  }));
  res.json(stats);
});
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
