import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { v4 as uuidv4 } from "uuid";
import { loadUsers, saveUsers, loadSessions, saveSessions } from "./store.js";

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const TOKEN_BYTES = 32;

function hashPassword(password, salt) {
  const key = scryptSync(password.normalize("NFKC"), salt, KEY_LENGTH);
  return `${salt.toString("hex")}:${key.toString("hex")}`;
}

function verifyPassword(password, stored) {
  const [saltHex, keyHex] = stored.split(":");
  const salt = Buffer.from(saltHex, "hex");
  const key = Buffer.from(keyHex, "hex");
  const derived = scryptSync(password.normalize("NFKC"), salt, KEY_LENGTH);
  if (derived.length !== key.length) return false;
  return timingSafeEqual(derived, key);
}

function normalizeEmail(email) {
  return email.trim().toLowerCase();
}

function generateToken() {
  return randomBytes(TOKEN_BYTES).toString("hex");
}

export function register(email, password) {
  const normalizedEmail = normalizeEmail(email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return { success: false, error: "Use a valid email." };
  }
  if (password.length < 6) {
    return { success: false, error: "Password needs at least 6 characters." };
  }

  const users = loadUsers();
  if (users.some((user) => user.email === normalizedEmail)) {
    return { success: false, error: "This email is already registered." };
  }

  const salt = randomBytes(SALT_LENGTH);
  const id = uuidv4();
  users.push({
    id,
    email: normalizedEmail,
    passwordHash: hashPassword(password, salt),
    createdAt: new Date().toISOString(),
  });
  saveUsers(users);

  const token = generateToken();
  const sessions = loadSessions();
  sessions[token] = { userId: id, createdAt: new Date().toISOString() };
  saveSessions(sessions);

  return { success: true, user: { id, email: normalizedEmail }, token };
}

export function login(email, password) {
  const normalizedEmail = normalizeEmail(email);
  const users = loadUsers();
  const user = users.find((u) => u.email === normalizedEmail);
  if (!user) {
    return { success: false, error: "Email not found. Register first." };
  }
  if (!verifyPassword(password, user.passwordHash)) {
    return { success: false, error: "Wrong password." };
  }

  const token = generateToken();
  const sessions = loadSessions();
  sessions[token] = { userId: user.id, createdAt: new Date().toISOString() };
  saveSessions(sessions);

  return { success: true, user: { id: user.id, email: user.email }, token };
}

export function verify(token) {
  const sessions = loadSessions();
  const session = sessions[token];
  if (!session) return null;

  const users = loadUsers();
  const user = users.find((u) => u.id === session.userId);
  if (!user) return null;

  return { id: user.id, email: user.email };
}

export function logout(token) {
  const sessions = loadSessions();
  delete sessions[token];
  saveSessions(sessions);
}

export function cleanupExpiredSessions(maxAgeMs = 7 * 24 * 60 * 60 * 1000) {
  const sessions = loadSessions();
  const now = Date.now();
  let changed = false;
  for (const [token, session] of Object.entries(sessions)) {
    if (now - new Date(session.createdAt).getTime() > maxAgeMs) {
      delete sessions[token];
      changed = true;
    }
  }
  if (changed) saveSessions(sessions);
}
