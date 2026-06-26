import express from "express";
import cors from "cors";
import { register, login, verify, logout, cleanupExpiredSessions } from "./auth.js";
import { loadUsers, saveUsers, loadSessions, saveSessions, loadLogs, appendLog } from "./store.js";

const app = express();
const PORT = Number(process.env.PORT) || 3699;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",").map((o) => o.trim());
const AUTH_TOKEN_HEADER = "x-auth-token";
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;
const AUTH_RATE_LIMIT_WINDOW_MS = Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
const AUTH_RATE_LIMIT_MAX = Number(process.env.AUTH_RATE_LIMIT_MAX) || 30;
const authAttempts = new Map();

app.disable("x-powered-by");
app.use(express.json({ limit: "10mb" }));
app.use(
  cors({
    origin(origin, callback) {
      if (!origin || ALLOWED_ORIGINS.includes(origin)) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true,
  }),
);

// Request logging middleware (async, persists to KV)
app.use((req, res, next) => {
  const start = Date.now();
  res.on("finish", () => {
    const log = {
      method: req.method,
      path: req.path,
      status: res.statusCode,
      duration: Date.now() - start,
      ip: req.ip || req.socket.remoteAddress,
      timestamp: new Date().toISOString(),
    };
    appendLog(log).catch(() => {});
  });
  next();
});

function getAuthFields(req) {
  const body = req.body && typeof req.body === "object" ? req.body : {};
  return {
    email: typeof body.email === "string" ? body.email : "",
    password: typeof body.password === "string" ? body.password : "",
  };
}

function rateLimitAuth(req, res, next) {
  const key = req.ip || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const current = authAttempts.get(key);
  if (!current || now - current.startedAt > AUTH_RATE_LIMIT_WINDOW_MS) {
    authAttempts.set(key, { count: 1, startedAt: now });
    return next();
  }
  current.count += 1;
  if (current.count > AUTH_RATE_LIMIT_MAX) {
    return res.status(429).json({ error: "Too many auth attempts. Try again later." });
  }
  return next();
}

function isSessionExpired(session) {
  const maxAge = Number(process.env.SESSION_MAX_AGE_MS) || 7 * 24 * 60 * 60 * 1000;
  const expiresAt = session.expiresAt ? new Date(session.expiresAt).getTime() : new Date(session.createdAt).getTime() + maxAge;
  return !Number.isFinite(expiresAt) || Date.now() > expiresAt;
}

function requireAdmin(req, res, next) {
  const key = req.headers["x-admin-key"];
  if (!ADMIN_API_KEY || key !== ADMIN_API_KEY) {
    return res.status(403).json({ error: "Forbidden." });
  }
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "intake-auth" });
});

// POST /api/scan — Gemini Vision food recognition
app.post("/api/scan", async (req, res) => {
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
  if (!GEMINI_API_KEY) {
    return res.status(503).json({ error: "AI scan not configured (missing GEMINI_API_KEY)." });
  }

  const { image, mimeType } = req.body ?? {};
  if (typeof image !== "string" || !image) {
    return res.status(400).json({ error: "Missing image field (base64 string required)." });
  }
  const safeMimeType = typeof mimeType === "string" && mimeType.startsWith("image/") ? mimeType : "image/jpeg";

  const prompt = `You are a nutrition AI. Look at this meal photo and identify each distinct food item visible.
Return a JSON array (no markdown fences, no extra text) where each element has exactly these fields:
- foodId: a short kebab-case identifier (e.g. "grilled-chicken")
- name: human-readable name (e.g. "Grilled Chicken")
- emoji: one food emoji
- detail: brief ingredient note (e.g. "Chicken breast, seasoned")
- servingUnit: unit for one serving (e.g. "piece", "cup", "bowl")
- kcalPerServing: estimated calories per one serving (integer)

Return at most 4 items. If no food is visible, return an empty array [].`;

  try {
    const geminiRes = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contents: [{
            parts: [
              { text: prompt },
              { inline_data: { mime_type: safeMimeType, data: image } },
            ],
          }],
          generationConfig: { temperature: 0.2, maxOutputTokens: 512 },
        }),
      }
    );

    if (!geminiRes.ok) {
      const errBody = await geminiRes.text();
      console.error("[scan] Gemini error", geminiRes.status, errBody);
      return res.status(502).json({ error: "AI recognition failed." });
    }

    const geminiBody = await geminiRes.json();
    const text = geminiBody?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    // Strip any accidental markdown fences
    const cleaned = text.replace(/```[\s\S]*?```/g, (m) => m.slice(m.indexOf("\n") + 1, m.lastIndexOf("```"))).trim();
    let foods;
    try {
      foods = JSON.parse(cleaned);
      if (!Array.isArray(foods)) foods = [];
    } catch {
      foods = [];
    }

    // Sanitise fields
    const result = foods.slice(0, 4).map((item) => ({
      foodId: String(item.foodId ?? "unknown").slice(0, 64),
      name: String(item.name ?? "Unknown").slice(0, 80),
      emoji: String(item.emoji ?? "🍽️").slice(0, 8),
      detail: String(item.detail ?? "").slice(0, 120),
      servingUnit: String(item.servingUnit ?? "serving").slice(0, 32),
      kcalPerServing: Math.max(0, Math.min(5000, Number(item.kcalPerServing) || 0)),
    }));

    return res.json({ foods: result });
  } catch (err) {
    console.error("[scan] unexpected error", err);
    return res.status(500).json({ error: "Unexpected error during scan." });
  }
});

app.post("/api/auth/register", rateLimitAuth, (req, res) => {
  const { email, password } = getAuthFields(req);
  const result = register(email, password);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ user: result.user, token: result.token });
});

app.post("/api/auth/login", rateLimitAuth, (req, res) => {
  const { email, password } = getAuthFields(req);
  const result = login(email, password);
  if (!result.success) {
    return res.status(401).json({ error: result.error });
  }
  res.json({ user: result.user, token: result.token });
});

app.get("/api/auth/verify", (req, res) => {
  const token = req.headers[AUTH_TOKEN_HEADER];
  if (!token || typeof token !== "string") {
    return res.status(401).json({ error: "No session token. Log in first." });
  }
  const user = verify(token);
  if (!user) {
    return res.status(401).json({ error: "Session expired. Log in again." });
  }
  res.json({ user });
});

app.post("/api/auth/logout", (req, res) => {
  const token = req.headers[AUTH_TOKEN_HEADER];
  if (token && typeof token === "string") {
    logout(token);
  }
  res.json({ success: true });
});

app.get("/api/admin/users", requireAdmin, (req, res) => {
  const users = loadUsers();
  const sessions = loadSessions();
  const userList = users.map((u) => ({
    id: u.id,
    email: u.email,
    createdAt: u.createdAt,
    sessionCount: Object.values(sessions).filter((s) => s.userId === u.id && !isSessionExpired(s)).length,
  }));
  res.json({ users: userList, total: userList.length });
});

app.get("/api/admin/stats", requireAdmin, (req, res) => {
  const users = loadUsers();
  const sessions = loadSessions();
  const now = new Date();
  const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();

  const totalUsers = users.length;
  const todayNew = users.filter((u) => u.createdAt >= todayStart).length;
  const activeSessions = Object.values(sessions).filter((s) => !isSessionExpired(s)).length;

  res.json({ totalUsers, todayNew, activeSessions });
});

app.get("/api/admin/logs", requireAdmin, async (req, res) => {
  const limit = Math.min(Number(req.query.limit) || 50, 100);
  const requestLogs = await loadLogs();
  const recentLogs = requestLogs.slice(-limit);
  const stats = {
    totalRequests: requestLogs.length,
    byMethod: {},
    byPath: {},
    byStatus: {},
  };
  for (const log of requestLogs) {
    stats.byMethod[log.method] = (stats.byMethod[log.method] || 0) + 1;
    stats.byPath[log.path] = (stats.byPath[log.path] || 0) + 1;
    stats.byStatus[String(log.status)] = (stats.byStatus[String(log.status)] || 0) + 1;
  }
  res.json({ logs: recentLogs, stats });
});

app.delete("/api/admin/users/:id", requireAdmin, (req, res) => {
  const { id } = req.params;
  const users = loadUsers();
  const idx = users.findIndex((u) => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ error: "User not found." });
  }
  users.splice(idx, 1);
  saveUsers(users);

  const sessions = loadSessions();
  let changed = false;
  for (const [token, session] of Object.entries(sessions)) {
    if (session.userId === id) {
      delete sessions[token];
      changed = true;
    }
  }
  if (changed) saveSessions(sessions);

  res.json({ success: true });
});

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON request body." });
  }
  console.error("[intake-auth] unexpected error", err);
  return res.status(500).json({ error: "Unexpected server error." });
});

if (!process.env.VERCEL) {
  cleanupExpiredSessions();
  app.listen(PORT, () => {
    console.log(`[intake-auth] server running on port ${PORT}`);
  });
}

export default app;
