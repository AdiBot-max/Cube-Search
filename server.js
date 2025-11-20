const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(__dirname));

const RAPIDAPI_KEY = "404e0293ecmshad6bea346293be7p171d07jsnabb538c1b944";

app.get("/api/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.json({ error: "Missing ?q=" });

  const url = `https://jsearch.p.rapidapi.com/search?query=${encodeURIComponent(
    query
  )}&page=1&num_pages=1&country=us&date_posted=all`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": RAPIDAPI_KEY,
        "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
      },
    });

    const data = await response.json();
    res.json(data);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log("Cube Search backend running on port " + PORT);
});
