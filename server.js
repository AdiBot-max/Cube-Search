const express = require('express');
const app = express();
const PORT = 3000;

// Serve frontend
app.use(express.static('.'));

// Proxy route
app.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: 'Query missing' });

  try {
    const url = `https://duckduckgo.com/html/?q=${encodeURIComponent(query)}`;

    // Node 18+ has fetch globally
    const response = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const html = await response.text();
    res.send(html);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch DuckDuckGo' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
