import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";

const DATA_DIR = process.env.INTAKE_DATA_DIR || "./data";
const USERS_FILE = join(DATA_DIR, "users.json");
const SESSIONS_FILE = join(DATA_DIR, "sessions.json");

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readJson(path, fallback) {
  try {
    const raw = readFileSync(path, "utf-8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(path, data) {
  ensureDataDir();
  writeFileSync(path, JSON.stringify(data, null, 2), "utf-8");
}

export function loadUsers() {
  return readJson(USERS_FILE, []);
}

export function saveUsers(users) {
  writeJson(USERS_FILE, users);
}

export function loadSessions() {
  return readJson(SESSIONS_FILE, {});
}

export function saveSessions(sessions) {
  writeJson(SESSIONS_FILE, sessions);
}
