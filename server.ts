import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const DIST_DIR = path.resolve(__dirname, "dist");

// Enable JSON body parsing for API endpoints
app.use(express.json());

// 1. Permanent 301 SEO Redirects for legacy and shorthand URLs
const PERMANENT_REDIRECTS: Record<string, string> = {
  "/sculptures": "/#portfolio",
  "/portfolio.html": "/#portfolio",
  "/gallery": "/#portfolio",
  "/gallery.html": "/#portfolio",
  "/bio": "/#about",
  "/biography": "/#about",
  "/about.html": "/#about",
  "/madmax.html": "/#madmax",
  "/mad-max": "/#madmax",
  "/exhibitions.html": "/#exhibitions",
  "/expos": "/#exhibitions",
  "/books.html": "/#books",
  "/monographs": "/#books",
  "/contact": "/#biography-images",
  "/contact.html": "/#biography-images",
};

Object.entries(PERMANENT_REDIRECTS).forEach(([fromPath, toPath]) => {
  app.get(fromPath, (req, res) => {
    res.redirect(301, toPath);
  });
});

// 2. API 404 Handler for non-existent /api routes
app.all("/api/*", (req, res) => {
  res.status(404).json({
    error: "Not Found",
    status: 404,
    path: req.originalUrl,
  });
});

// 3. Serve static assets with appropriate caching
if (fs.existsSync(DIST_DIR)) {
  app.use(
    express.static(DIST_DIR, {
      maxAge: "1d",
      setHeaders: (res, filePath) => {
        // Immutable cache for fingerprinted Vite assets
        if (filePath.includes("/assets/")) {
          res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
        }
      },
    })
  );

  // 4. SPA Fallback: Serve dist/index.html with pre-rendered indexable markup
  app.get("*", (req, res) => {
    const indexPath = path.join(DIST_DIR, "index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).send("Application not built. Run npm run build first.");
    }
  });
} else {
  // If dist doesn't exist yet
  app.get("*", (req, res) => {
    res.status(200).send("Olivier Pauwels server running. Run npm run build for production bundle.");
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`[Olivier Pauwels] Production server running on http://0.0.0.0:${PORT}`);
});
