import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable JSON parsing
app.use(express.json());

// --- CORS setup: allow local dev URL ---
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:8080"); // your local page
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Serve static files (optional, if you have HTML in same folder)
app.use(express.static("./"));

// Search endpoint
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

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
