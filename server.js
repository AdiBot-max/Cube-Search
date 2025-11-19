import express from "express";
import fetch from "node-fetch";
import { load } from "cheerio";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

// Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Allow frontend requests
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    next();
});

// Serve index.html (the UI)
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// Proxy route
app.get("/api/search", async (req, res) => {
    const query = req.query.q;
    if (!query) return res.json({ results: [] });

    try {
        const response = await fetch(
            `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`
        );
        const html = await response.text();

        const $ = load(html);
        const results = [];

        $(".result__title").each((i, elem) => {
            const title = $(elem).text().trim();
            const url = $(elem).find("a").attr("href");
            const snippet = $(elem).parent().find(".result__snippet").text().trim();

            if (title && url) results.push({ title, url, snippet });
        });

        res.json({ results });

    } catch (err) {
        console.error(err);
        res.json({ results: [] });
    }
});

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
