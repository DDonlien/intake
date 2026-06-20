import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import { v4 as uuidv4 } from "uuid";
import { loadUsers, saveUsers, loadSessions, saveSessions } from "./store.js";

const SALT_LENGTH = 16;
const KEY_LENGTH = 64;
const TOKEN_BYTES = 32;
const SESSION_MAX_AGE_MS = Number(process.env.SESSION_MAX_AGE_MS) || 7 * 24 * 60 * 60 * 1000;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  if (typeof email !== "string") return "";
  return email.trim().toLowerCase();
}

function normalizePassword(password) {
  return typeof password === "string" ? password : "";
}

function generateToken() {
  return randomBytes(TOKEN_BYTES).toString("hex");
}

function createSession(userId) {
  const token = generateToken();
  const now = Date.now();
  const sessions = loadSessions();
  sessions[token] = {
    userId,
    createdAt: new Date(now).toISOString(),
    expiresAt: new Date(now + SESSION_MAX_AGE_MS).toISOString(),
  };
  saveSessions(sessions);
  return token;
}

function isExpired(session, now = Date.now()) {
  const expiresAt = session.expiresAt ? new Date(session.expiresAt).getTime() : new Date(session.createdAt).getTime() + SESSION_MAX_AGE_MS;
  return !Number.isFinite(expiresAt) || now > expiresAt;
}

export function register(email, password) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = normalizePassword(password);
  if (!EMAIL_PATTERN.test(normalizedEmail)) {
    return { success: false, error: "Use a valid email." };
  }
  if (normalizedPassword.length < 6) {
    return { success: false, error: "Password needs at least 6 characters." };
  }

  cleanupExpiredSessions();
  const users = loadUsers();
  if (users.some((user) => user.email === normalizedEmail)) {
    return { success: false, error: "This email is already registered." };
  }

  const salt = randomBytes(SALT_LENGTH);
  const id = uuidv4();
  users.push({
    id,
    email: normalizedEmail,
    passwordHash: hashPassword(normalizedPassword, salt),
    createdAt: new Date().toISOString(),
  });
  saveUsers(users);

  const token = createSession(id);

  return { success: true, user: { id, email: normalizedEmail }, token };
}

export function login(email, password) {
  const normalizedEmail = normalizeEmail(email);
  const normalizedPassword = normalizePassword(password);
  cleanupExpiredSessions();
  const users = loadUsers();
  const user = users.find((u) => u.email === normalizedEmail);
  if (!user) {
    return { success: false, error: "Email not found. Register first." };
  }
  if (!verifyPassword(normalizedPassword, user.passwordHash)) {
    return { success: false, error: "Wrong password." };
  }

  const token = createSession(user.id);

  return { success: true, user: { id: user.id, email: user.email }, token };
}

export function verify(token) {
  if (typeof token !== "string" || !token) return null;
  const sessions = loadSessions();
  const session = sessions[token];
  if (!session) return null;
  if (isExpired(session)) {
    delete sessions[token];
    saveSessions(sessions);
    return null;
  }

  const users = loadUsers();
  const user = users.find((u) => u.id === session.userId);
  if (!user) return null;

  return { id: user.id, email: user.email };
}

export function logout(token) {
  if (typeof token !== "string" || !token) return;
  const sessions = loadSessions();
  delete sessions[token];
  saveSessions(sessions);
}

export function cleanupExpiredSessions(maxAgeMs = SESSION_MAX_AGE_MS) {
  const sessions = loadSessions();
  const now = Date.now();
  let changed = false;
  for (const [token, session] of Object.entries(sessions)) {
    const expiresAt = session.expiresAt ? new Date(session.expiresAt).getTime() : new Date(session.createdAt).getTime() + maxAgeMs;
    if (!Number.isFinite(expiresAt) || now > expiresAt) {
      delete sessions[token];
      changed = true;
    }
  }
  if (changed) saveSessions(sessions);
}
