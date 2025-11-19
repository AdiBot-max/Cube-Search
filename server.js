import express from "express";
import fetch from "node-fetch";
import cheerio from "cheerio";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(__dirname));

app.get("/api/search", async (req, res) => {
    const q = req.query.q;
    if (!q) return res.json({ results: [] });

    try {
        const ddg = await fetch(`https://duckduckgo.com/html/?q=${encodeURIComponent(q)}`, {
            headers: { "User-Agent": "Mozilla/5.0" }
        });

        const html = await ddg.text();
        const $ = cheerio.load(html);

        const results = [];

        $(".result").each((i, el) => {
            const title = $(el).find(".result__a").text().trim();
            const url = $(el).find(".result__a").attr("href");
            const snippet = $(el).find(".result__snippet").text().trim();

            if (title && url) results.push({ title, url, snippet });
        });

        res.json({ results });

    } catch (err) {
        res.json({ results: [] });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));
