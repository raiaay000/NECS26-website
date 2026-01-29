/*
  Minimal local backend for cart + reminders persistence.
  No dependencies required. Run with: node server.js
*/

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT ? Number(process.env.PORT) : 8787;
const DATA_DIR = path.join(__dirname, 'data');
const DATA_FILE = path.join(DATA_DIR, 'state.json');

function ensureDataFile() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
  if (!fs.existsSync(DATA_FILE)) fs.writeFileSync(DATA_FILE, JSON.stringify({ users: {} }, null, 2));
}

function readState() {
  ensureDataFile();
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return { users: {} };
    if (!parsed.users || typeof parsed.users !== 'object') parsed.users = {};
    return parsed;
  } catch {
    return { users: {} };
  }
}

function writeState(state) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2));
}

function json(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  const headers = {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type'
  };

  // If the client disconnects mid-response, Node can throw EPIPE/ERR_STREAM_WRITE_AFTER_END.
  // Treat that as a no-op so the server doesn't crash or spam logs.
  try {
    if (res.writableEnded || res.destroyed) return;
    res.writeHead(statusCode, headers);
    res.end(body);
  } catch (err) {
    const code = err && (err.code || err.name);
    if (code === 'EPIPE' || code === 'ERR_STREAM_WRITE_AFTER_END') return;
    throw err;
  }
}

function notFound(res) {
  json(res, 404, { error: 'Not found' });
}

function badRequest(res, message) {
  json(res, 400, { error: message || 'Bad request' });
}

function parseBody(req) {
  return new Promise((resolve) => {
    let data = '';
    let aborted = false;
    req.on('aborted', () => {
      aborted = true;
      resolve(null);
    });
    req.on('data', (chunk) => { data += chunk; });
    req.on('end', () => {
      if (aborted) return;
      if (!data) return resolve(null);
      try {
        resolve(JSON.parse(data));
      } catch {
        resolve(null);
      }
    });
  });
}

function getUserState(uid) {
  const state = readState();
  const existing = state.users[uid];
  if (existing && typeof existing === 'object') return existing;
  return { cart: {}, reminders: [], musicLikes: [] };
}

function sanitizeCart(cart) {
  if (!cart || typeof cart !== 'object') return {};
  const out = {};
  Object.entries(cart).forEach(([k, v]) => {
    const n = Number(v);
    if (!Number.isFinite(n) || n <= 0) return;
    out[String(k)] = Math.floor(n);
  });
  return out;
}

function sanitizeReminders(reminders) {
  if (!Array.isArray(reminders)) return [];
  return reminders
    .filter((r) => r && typeof r === 'object' && typeof r.key === 'string')
    .map((r) => ({
      key: String(r.key),
      title: String(r.title || ''),
      day: String(r.day || ''),
      time: String(r.time || ''),
      stage: String(r.stage || ''),
      startsAt: Number(r.startsAt || 0),
      createdAt: Number(r.createdAt || Date.now())
    }));
}

function sanitizeMusicLikes(musicLikes) {
  if (!Array.isArray(musicLikes)) return [];
  return musicLikes
    .filter((k) => typeof k === 'string' && k.trim())
    .map((k) => String(k));
}

const server = http.createServer(async (req, res) => {
  res.on('error', (err) => {
    const code = err && (err.code || err.name);
    if (code === 'EPIPE' || code === 'ECONNRESET') return;
    // eslint-disable-next-line no-console
    console.error('Response error:', err);
  });

  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,PUT,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (url.pathname === '/api/health') {
    json(res, 200, { ok: true, now: Date.now() });
    return;
  }

  if (url.pathname !== '/api/state') {
    notFound(res);
    return;
  }

  const uid = String(url.searchParams.get('uid') || '').trim();
  if (!uid) {
    badRequest(res, 'Missing uid');
    return;
  }

  if (req.method === 'GET') {
    const userState = getUserState(uid);
    json(res, 200, { uid, ...userState });
    return;
  }

  if (req.method === 'PUT') {
    const body = await parseBody(req);
    if (!body || typeof body !== 'object') {
      badRequest(res, 'Invalid JSON body');
      return;
    }

    const state = readState();
    const existing = getUserState(uid);
    const next = {
      cart: sanitizeCart(body.cart ?? existing.cart),
      reminders: sanitizeReminders(body.reminders ?? existing.reminders),
      musicLikes: sanitizeMusicLikes(body.musicLikes ?? existing.musicLikes)
    };
    state.users[uid] = next;
    writeState(state);
    json(res, 200, { uid, ...next });
    return;
  }

  json(res, 405, { error: 'Method not allowed' });
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
  ensureDataFile();
  // eslint-disable-next-line no-console
  console.log(`NECS local backend running on http://localhost:${PORT}`);
});
