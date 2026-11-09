const http = require('http');
const fs = require('fs');
const path = require('path');

let PORT = parseInt(process.env.PORT, 10) || 3100;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURIComponent(new URL(req.url, `http://${req.headers.host}`).pathname);

  // Normalize path
  let filePath = path.join(ROOT, reqPath);

  // Security check: ensure path stays within ROOT
  if (!filePath.startsWith(ROOT)) {
    res.statusCode = 403;
    res.end('Access Denied');
    return;
  }

  // Check if filePath is a directory or needs index.html
  if (fs.existsSync(filePath)) {
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
  } else {
    // Try adding index.html (for clean urls without trailing slash like /blog or /guides)
    const withIndex = path.join(filePath, 'index.html');
    if (fs.existsSync(withIndex)) {
      filePath = withIndex;
    } else if (fs.existsSync(filePath + '.html')) {
      filePath = filePath + '.html';
    }
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    
    // Set caching headers
    if (reqPath.startsWith('/_astro/')) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    }

    res.writeHead(200, { 'Content-Type': contentType });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(`<!DOCTYPE html><html><head><title>404 Not Found - ezvibecode</title><style>body{font-family:system-ui;text-align:center;padding:10vh 2rem;background:#f4f1e8;color:#1a1917;}a{color:#1a1917;font-weight:bold;}</style></head><body><h1>404 — Page Not Found</h1><p>We couldn't find what you were looking for.</p><p><a href="/">Return to ezvibecode home</a></p></body></html>`);
  }
});

function startServer(port) {
  server.listen(port, () => {
    console.log(`ezvibecode server running at:`);
    console.log(`  > Local:   http://localhost:${port}/`);
    console.log(`  > Guides:  http://localhost:${port}/guides/`);
    console.log(`  > Blog:    http://localhost:${port}/blog/`);
  });
}

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.warn(`Port ${PORT} is in use, trying port ${PORT + 1}...`);
    PORT++;
    startServer(PORT);
  } else {
    console.error('Server error:', err);
  }
});

startServer(PORT);
