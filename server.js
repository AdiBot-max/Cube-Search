const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
app.use(cors());

const RAPID_KEY = "404e0293ecmshad6bea346293be7p171d07jsnabb538c1b944";

// MAIN SEARCH ENDPOINT
app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json({ results: [] });

  const url = `https://bing-web-search1.p.rapidapi.com/search?mkt=en-us&safeSearch=Off&textFormat=Raw&q=${encodeURIComponent(
    q
  )}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPID_KEY,
        "X-RapidAPI-Host": "bing-web-search1.p.rapidapi.com",
      },
    });

    const bingData = await response.json();

    // Format results for your frontend
    const results = (bingData.webPages?.value || []).map((item) => ({
      title: item.name,
      url: item.url,
      snippet: item.snippet,
    }));

    res.json({ results });
  } catch (err) {
    console.error("SEARCH ERROR:", err);
    res.status(500).json({ error: "Failed to fetch from Bing API" });
  }
});

// Render will use this port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port", PORT));
