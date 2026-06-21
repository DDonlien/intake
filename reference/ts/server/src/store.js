import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

// Try to load Vercel KV
let kv = null;
try {
  const { createClient } = await import("@vercel/kv");
  if (process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN) {
    kv = createClient({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    });
  }
} catch {
  // KV not available
}

// Vercel serverless functions can only write to /tmp
const DATA_DIR = process.env.INTAKE_DATA_DIR || (process.env.VERCEL ? "/tmp" : "./data");
const USERS_FILE = join(DATA_DIR, "users.json");
const SESSIONS_FILE = join(DATA_DIR, "sessions.json");

// In-memory cache (preloaded from KV or file)
let usersCache = [];
let sessionsCache = {};

async function preload() {
  if (kv) {
    try {
      usersCache = (await kv.get("users")) || [];
    } catch {
      usersCache = [];
    }
    try {
      sessionsCache = (await kv.get("sessions")) || {};
    } catch {
      sessionsCache = {};
    }
  } else {
    try {
      usersCache = JSON.parse(readFileSync(USERS_FILE, "utf-8"));
    } catch {
      usersCache = [];
    }
    try {
      sessionsCache = JSON.parse(readFileSync(SESSIONS_FILE, "utf-8"));
    } catch {
      sessionsCache = {};
    }
  }
}

await preload();

export function loadUsers() {
  return usersCache;
}

export function saveUsers(users) {
  usersCache = users;
  if (kv) {
    kv.set("users", users).catch(() => {});
  } else {
    try {
      mkdirSync(DATA_DIR, { recursive: true });
      writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
    } catch {}
  }
}

export function loadSessions() {
  return sessionsCache;
}

export function saveSessions(sessions) {
  sessionsCache = sessions;
  if (kv) {
    kv.set("sessions", sessions).catch(() => {});
  } else {
    try {
      mkdirSync(DATA_DIR, { recursive: true });
      writeFileSync(SESSIONS_FILE, JSON.stringify(sessions, null, 2), "utf-8");
    } catch {}
  }
}
