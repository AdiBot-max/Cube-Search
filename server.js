import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Your RapidAPI key
const RAPID_KEY = "404e0293ecmshad6bea346293be7p171d07jsnabb538c1b944";

app.get("/api/search", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.status(400).json({ error: "Missing ?q=" });

    const url = `https://bing-web-search1.p.rapidapi.com/search?q=${encodeURIComponent(q)}&mkt=en-us&safeSearch=Off&textFormat=Raw`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "x-rapidapi-host": "bing-web-search1.p.rapidapi.com",
                "x-rapidapi-key": RAPID_KEY
            }
        });

        const data = await response.json();
        res.json(data);

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Search failed" });
    }
});

app.get("/", (req, res) => {
    res.send("Cube Search API is running.");
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Server running on port", PORT));
