const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const app = express();

app.use(require("cors")());
app.use(express.static(".")); // Serve everything in root

// 🔑 Your RapidAPI key (keep private)
const RAPID_KEY = "404e0293ecmshad6bea346293be7p171d07jsnabb538c1b944";

// ✅ Root route → loads index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// ✅ Search API route (Bing Web Search via RapidAPI)
app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json({ error: "Missing ?q=" });

  const url = "https://bing-web-search1.p.rapidapi.com/search";

  const params = new URLSearchParams({
    q,
    mkt: "en-us",
    safeSearch: "Off",
    textFormat: "Raw",
    freshness: "Day"
  });

  try {
    const response = await fetch(`${url}?${params}`, {
      method: "GET",
      headers: {
        "x-rapidapi-key": RAPID_KEY,
        "x-rapidapi-host": "bing-web-search1.p.rapidapi.com"
      }
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.error("API Error:", err);
    res.status(500).json({ error: "Failed to fetch search results" });
  }
});

// Render uses PORT from env
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Cube Search backend running"));
