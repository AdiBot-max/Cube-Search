import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());

const EXA_KEY = process.env.EXA_API_KEY;
const PORT = process.env.PORT || 10000;

// -------------------------
//   SERVE FRONTEND
// -------------------------
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// -------------------------
//   SEARCH ENDPOINT
// -------------------------
app.post("/search", async (req, res) => {
  try {
    const query = req.body.query;
    const num = req.body.numResults || 10;

    if (!query) {
      return res.status(400).json({ error: "Missing 'query'" });
    }

    const response = await fetch("https://api.exa.ai/search", {
      method: "POST",
      headers: {
        "x-api-key": EXA_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        query,
        numResults: num,
        useAutoprompt: true
      })
    });

    const raw = await response.json();

    const results = (raw.results || []).map(r => ({
      title: r.title || "No Title",
      url: r.url,
      snippet: r.text || "",
      image: r.images?.[0] || null
    }));

    res.json({
      success: true,
      total: results.length,
      results
    });

  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// -------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
