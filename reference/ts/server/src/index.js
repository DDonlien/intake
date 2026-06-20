import express from "express";
import cors from "cors";
import { register, login, verify, logout, cleanupExpiredSessions } from "./auth.js";

const app = express();
const PORT = Number(process.env.PORT) || 3699;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",").map((o) => o.trim());
const AUTH_TOKEN_HEADER = "x-auth-token";
const AUTH_RATE_LIMIT_WINDOW_MS = Number(process.env.AUTH_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
const AUTH_RATE_LIMIT_MAX = Number(process.env.AUTH_RATE_LIMIT_MAX) || 30;
const authAttempts = new Map();

app.disable("x-powered-by");
app.use(express.json({ limit: "16kb" }));
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

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "intake-auth" });
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

app.use((err, _req, res, _next) => {
  if (err instanceof SyntaxError) {
    return res.status(400).json({ error: "Invalid JSON request body." });
  }
  console.error("[intake-auth] unexpected error", err);
  return res.status(500).json({ error: "Unexpected server error." });
});

cleanupExpiredSessions();

app.listen(PORT, () => {
  console.log(`[intake-auth] server running on port ${PORT}`);
});
