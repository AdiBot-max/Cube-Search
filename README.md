# Cube search

A simple search engine frontend that fetches DuckDuckGo search results through a Node.js proxy and shows **direct links** to websites.  
Works locally or deployed (e.g., on Render).

---

## Features

- Uses Node.js + Express as a proxy to fetch DuckDuckGo results.
- Avoids CORS issues by routing requests through your server.
- Decodes DuckDuckGo redirect links (`uddg`) to show **direct links**.
- Single-page frontend (`index.html`) with a search box and results.
- Ready for deployment on cloud services like Render.

---

## Requirements

- Node.js 18+ (built-in `fetch` used)
- npm
- Internet connection

---

## Installation

1. Clone or download the project.
2. Open terminal in the project folder.
3. Install dependencies:

```bash
npm install

