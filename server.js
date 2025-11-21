import express from "express";
import fetch from "node-fetch";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static HTML
app.use(express.static("./"));

app.get("/api/search", async (req, res) => {
  const q = req.query.q;
  if (!q) return res.json({ results: [] });

  const apiKey = process.env.EXA_API_KEY;

  try {
    const response = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query: q,
        numResults: 8
      })
    });

    const data = await response.json();

    res.json({
      results: data.results || []
    });

  } catch (err) {
    res.json({ results: [], error: err.message });
  }
});

app.listen(PORT, () => console.log("Server running on port", PORT));
