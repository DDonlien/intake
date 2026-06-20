/**
 * Low-level LocalStorage helpers with quota awareness and safe JSON handling.
 *
 * Business-level normalization, migration, and defaults live in `data.ts`.
 */

export type WriteResult = { success: true } | { success: false; error: string };

export function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("[storage] read failed", key, error);
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): WriteResult {
  try {
    if (!key) {
      return { success: false, error: "Storage key is empty." };
    }
    const serialized = JSON.stringify(value);
    localStorage.setItem(key, serialized);
    return { success: true };
  } catch (error) {
    let message = "Could not save data.";
    if (error instanceof DOMException) {
      if (error.name === "QuotaExceededError" || error.code === 22) {
        message = "Storage full. Free up browser space and try again.";
      } else {
        message = `Save failed: ${error.message}`;
      }
    }
    // eslint-disable-next-line no-console
    console.error("[storage] write failed", key, error);
    return { success: false, error: message };
  }
}

export function removeItem(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}

export function clearWithPrefix(prefix: string) {
  try {
    const keysToRemove: string[] = [];
    for (let index = 0; index < localStorage.length; index += 1) {
      const key = localStorage.key(index);
      if (key && key.startsWith(prefix)) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(removeItem);
  } catch {
    // ignore
  }
}
