import express from "express";
import cors from "cors";
import { register, login, verify, logout } from "./auth.js";

const app = express();
const PORT = Number(process.env.PORT) || 3699;
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:5173").split(",").map((o) => o.trim());
const AUTH_TOKEN_HEADER = "x-auth-token";

app.disable("x-powered-by");
app.use(express.json());
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

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "intake-auth" });
});

app.post("/api/auth/register", (req, res) => {
  const result = register(req.body.email, req.body.password);
  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  res.json({ user: result.user, token: result.token });
});

app.post("/api/auth/login", (req, res) => {
  const result = login(req.body.email, req.body.password);
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

app.listen(PORT, () => {
  console.log(`[intake-auth] server running on port ${PORT}`);
});
