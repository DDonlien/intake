import type { Account } from "./data";

const AUTH_API = import.meta.env.VITE_AUTH_API_URL as string | undefined;

type AuthResult = { success: true; user: Account; token: string } | { success: false; error: string };

function authUrl(path: string) {
  return `${AUTH_API}${path}`;
}

function apiError(error: unknown): string {
  if (error instanceof TypeError && error.message === "Failed to fetch") {
    return "Auth server unreachable. Check your connection or NAS status.";
  }
  return `Server error: ${error instanceof Error ? error.message : String(error)}`;
}

export function usesServerAuth(): boolean {
  return !!AUTH_API;
}

export function getStoredSession(): { userId?: string; serverToken?: string } {
  try {
    const raw = localStorage.getItem("intake.session.v1");
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveSession(userId: string, token?: string) {
  localStorage.setItem("intake.session.v1", JSON.stringify({ userId, serverToken: token }));
}

export function clearSession() {
  localStorage.removeItem("intake.session.v1");
}

async function serverRegister(email: string, password: string): Promise<AuthResult> {
  const res = await fetch(authUrl("/api/auth/register"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await res.json();
  if (!res.ok) return { success: false, error: body.error || "Registration failed." };
  return { success: true, user: { id: body.user.id, email: body.user.email, password: "" }, token: body.token };
}

async function serverLogin(email: string, password: string): Promise<AuthResult> {
  const res = await fetch(authUrl("/api/auth/login"), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const body = await res.json();
  if (!res.ok) return { success: false, error: body.error || "Login failed." };
  return { success: true, user: { id: body.user.id, email: body.user.email, password: "" }, token: body.token };
}

async function serverVerify(token: string): Promise<{ id: string; email: string } | null> {
  try {
    const res = await fetch(authUrl("/api/auth/verify"), {
      headers: { "x-auth-token": token },
    });
    if (!res.ok) return null;
    const body = await res.json();
    return body.user;
  } catch {
    return null;
  }
}

async function serverLogout(token: string) {
  try {
    await fetch(authUrl("/api/auth/logout"), {
      method: "POST",
      headers: { "x-auth-token": token },
    });
  } catch {
    // best-effort
  }
}

export async function authRegister(email: string, password: string): Promise<AuthResult> {
  try {
    return await serverRegister(email, password);
  } catch (error) {
    return { success: false, error: apiError(error) };
  }
}

export async function authLogin(email: string, password: string): Promise<AuthResult> {
  try {
    return await serverLogin(email, password);
  } catch (error) {
    return { success: false, error: apiError(error) };
  }
}

export async function authVerify(): Promise<Account | null> {
  const session = getStoredSession();
  if (!session.serverToken || !session.userId) return null;
  try {
    const user = await serverVerify(session.serverToken);
    if (!user) {
      clearSession();
      return null;
    }
    return { id: user.id, email: user.email, password: "" };
  } catch {
    // server unreachable - keep local session, user can still use local data
    return null;
  }
}

export async function authLogout(account: Account | null) {
  const session = getStoredSession();
  if (session.serverToken) {
    await serverLogout(session.serverToken);
  }
  clearSession();
}
