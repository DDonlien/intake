# Intake Auth Server — NAS Deployment Guide

## Overview

A lightweight Node.js auth server for the Intake P0.1 prototype. Handles only register, login, session verify, and logout.

- **Purpose**: Verify email/password identity. No business data (meals, goals, health) touches this server.
- **Data stored**: User ID, normalized email, password hash (scrypt), session tokens.
- **Port**: `3699` (configurable)

## Build & Run

### 1. Local development

```bash
cd reference/ts/server
cp .env.example .env
npm install
npm run dev
```

Server starts on `http://localhost:3699`. Health check: `GET /api/health`

### 2. Docker (local test)

```bash
cd reference/ts/server
docker compose up --build
```

### 3. Deploy on NAS (Synology / QNAP / any Linux host)

**Option A: Docker on NAS**

1. Copy the `reference/ts/server/` directory to your NAS.
2. Configure environment:
   - `ALLOWED_ORIGINS`: comma-separated list of allowed frontend origins (e.g. your GitHub Pages domain, local dev).
   - `PORT`: optional, defaults to `3699`.
3. Run with docker-compose:

```bash
cd /path/to/server
docker compose up -d
```

4. The server persists users and sessions in `./data/` (mounted volume).

**Option B: Direct Node.js**

1. Install Node.js 22+ on your NAS.
2. Copy `server/` directory, run `npm install --omit=dev`.
3. Start with `node src/index.js` (use a process manager like pm2 or the NAS built-in task scheduler).

### 4. DNS & Reverse Proxy

- If your NAS has a dynamic public IP, set up a Dynamic DNS (DDNS) record (e.g. `intake-auth.yourdomain.com`).
- Configure your router to forward port `3699` (or the port you chose) to the NAS.
- Alternatively, use a reverse proxy (e.g. Nginx Proxy Manager on NAS, or Synology Reverse Proxy) to map `intake-auth.yourdomain.com` to `localhost:3699`.

Example Nginx reverse proxy snippet:

```nginx
server {
    listen 443 ssl;
    server_name intake-auth.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3699;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 5. Connect Frontend

Build the TS frontend with the auth API URL:

```bash
cd reference/ts
VITE_AUTH_API_URL=https://intake-auth.yourdomain.com npm run build
```

Or add it to your CI workflow. When `VITE_AUTH_API_URL` is unset, the frontend uses the existing localStorage-based auth (backward compatible).

## API Reference

### `POST /api/auth/register`

```json
{ "email": "user@example.com", "password": "mypassword" }
```

Response 200:
```json
{ "user": { "id": "uuid", "email": "user@example.com" }, "token": "hex-token" }
```

Response 400:
```json
{ "error": "This email is already registered." }
```

### `POST /api/auth/login`

Same request body. Response same as register.

### `GET /api/auth/verify`

Header: `x-auth-token: <token>`

Response 200:
```json
{ "user": { "id": "uuid", "email": "user@example.com" } }
```

Response 401:
```json
{ "error": "Session expired. Log in again." }
```

### `POST /api/auth/logout`

Header: `x-auth-token: <token>`

Response 200:
```json
{ "success": true }
```

### `GET /api/health`

Response 200:
```json
{ "status": "ok", "service": "intake-auth" }
```

## Security Notes

- Passwords hashed with Node.js `crypto.scrypt` + random salt.
- Session tokens are 64-char hex strings from `crypto.randomBytes(32)`.
- Tokens expire after 7 days (hard-coded in `auth.js`).
- CORS restricted to `ALLOWED_ORIGINS` env var.
- No business data accepted or stored. Only auth fields.

## What This Validates (P0.1 Scope)

- [x] Email registration and login via a server (not just localStorage)
- [x] Session token management
- [x] NAS-deployable with Docker
- [x] Business data never sent to server
- [ ] **Not validated**: multi-device sync, password reset, email verification, rate limiting, HTTPS certificate auto-renewal

## Next Iteration Suggestions

1. Add HTTPS (Let's Encrypt via reverse proxy or Caddy)
2. Add rate limiting per IP (express-rate-limit)
3. Add email verification flow (sendgrid, resend, etc.)
4. Consider SQLite for better concurrent access
