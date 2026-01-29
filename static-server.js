/*
  Minimal static file server for this project (no dependencies).
  Run with: node static-server.js
*/

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT ? Number(process.env.PORT) : 5500;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.mp3': 'audio/mpeg',
  '.ico': 'image/x-icon'
};

function safeJoin(root, target) {
  const resolved = path.resolve(root, target);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function send(res, status, headers, bodyStream) {
  try {
    if (res.writableEnded || res.destroyed) return;
    res.writeHead(status, headers);
    if (bodyStream) {
      bodyStream.pipe(res);
    } else {
      res.end();
    }
  } catch (err) {
    const code = err && (err.code || err.name);
    if (code === 'EPIPE' || code === 'ERR_STREAM_WRITE_AFTER_END') return;
    throw err;
  }
}

function notFound(res) {
  const body = Buffer.from('Not found');
  try {
    if (res.writableEnded || res.destroyed) return;
    res.writeHead(404, {
      'Content-Type': 'text/plain; charset=utf-8',
      'Content-Length': body.length
    });
    res.end(body);
  } catch (err) {
    const code = err && (err.code || err.name);
    if (code === 'EPIPE' || code === 'ERR_STREAM_WRITE_AFTER_END') return;
    throw err;
  }
}

const server = http.createServer((req, res) => {
  res.on('error', (err) => {
    const code = err && (err.code || err.name);
    if (code === 'EPIPE' || code === 'ECONNRESET') return;
    // eslint-disable-next-line no-console
    console.error('Response error:', err);
  });

  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = decodeURIComponent(url.pathname);
  if (pathname === '/') pathname = '/index.html';

  const filePath = safeJoin(ROOT, pathname.slice(1));
  if (!filePath) {
    res.writeHead(400);
    res.end('Bad request');
    return;
  }

  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      notFound(res);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = MIME[ext] || 'application/octet-stream';

    const headers = {
      'Content-Type': type,
      'Content-Length': stat.size,
      // light caching for static assets, no-cache for HTML
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=600'
    };

    const stream = fs.createReadStream(filePath);
    stream.on('error', () => notFound(res));

    // If the client disconnects while we're streaming (common with large videos),
    // destroy the file stream to avoid EPIPE/broken pipe errors.
    res.on('close', () => {
      if (!stream.destroyed) stream.destroy();
    });
    req.on('aborted', () => {
      if (!stream.destroyed) stream.destroy();
    });

    send(res, 200, headers, stream);
  });
});

server.on('clientError', (err, socket) => {
  const code = err && (err.code || err.name);
  if (code === 'ECONNRESET' || code === 'EPIPE') {
    socket.destroy();
    return;
  }
  socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
});

server.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Static server running on http://localhost:${PORT}`);
});
