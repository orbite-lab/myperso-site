// Minimal zero-dependency static server for the single-page site in ./site.
// The homepage bundle (site/index.html) is fully self-contained, so this just
// serves that one file. Run: `npm run dev`  →  http://localhost:3000
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { join, extname, normalize } from "node:path";

const PORT = process.env.PORT || 3000;
const ROOT = join(process.cwd(), "site");

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".png": "image/png",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".pdf": "application/pdf",
  ".ico": "image/x-icon",
};

const server = createServer(async (req, res) => {
  let pathname = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  if (pathname === "/" || pathname === "") pathname = "/index.html";

  const filePath = normalize(join(ROOT, pathname));
  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403);
    return res.end("Forbidden");
  }

  try {
    const data = await readFile(filePath);
    res.writeHead(200, { "content-type": TYPES[extname(filePath)] || "application/octet-stream" });
    res.end(data);
  } catch {
    // Single-page site: fall back to index.html for any unknown path.
    try {
      const data = await readFile(join(ROOT, "index.html"));
      res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end("Not found");
    }
  }
});

server.listen(PORT, () => {
  console.log(`\n  ▲ serving ./site  →  http://localhost:${PORT}\n`);
});
