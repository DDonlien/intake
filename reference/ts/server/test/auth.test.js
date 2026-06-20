import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const dataDir = mkdtempSync(join(tmpdir(), "intake-auth-test-"));
process.env.INTAKE_DATA_DIR = dataDir;

const auth = await import("../src/auth.js");
const store = await import("../src/store.js");

test.after(() => {
  rmSync(dataDir, { recursive: true, force: true });
});

test("register normalizes email, hashes password, and creates a verifiable session", () => {
  const result = auth.register("  Tao@Example.COM  ", "intake1");

  assert.equal(result.success, true);
  assert.equal(result.user.email, "tao@example.com");
  assert.match(result.token, /^[a-f0-9]{64}$/);

  const users = store.loadUsers();
  assert.equal(users.length, 1);
  assert.equal(users[0].email, "tao@example.com");
  assert.notEqual(users[0].passwordHash, "intake1");
  assert.equal(users[0].password, undefined);

  assert.deepEqual(auth.verify(result.token), result.user);
});

test("register rejects duplicate emails", () => {
  const result = auth.register("tao@example.com", "intake1");

  assert.equal(result.success, false);
  assert.equal(result.error, "This email is already registered.");
});

test("login returns the same stable user id and a new session token", () => {
  const users = store.loadUsers();
  const result = auth.login("TAO@example.com", "intake1");

  assert.equal(result.success, true);
  assert.equal(result.user.id, users[0].id);
  assert.equal(result.user.email, "tao@example.com");
  assert.deepEqual(auth.verify(result.token), result.user);
});

test("login rejects the wrong password", () => {
  const result = auth.login("tao@example.com", "wrong-password");

  assert.equal(result.success, false);
  assert.equal(result.error, "Wrong password.");
});

test("logout invalidates a session token", () => {
  const result = auth.login("tao@example.com", "intake1");
  assert.equal(result.success, true);

  auth.logout(result.token);

  assert.equal(auth.verify(result.token), null);
});
