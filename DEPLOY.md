# Deployment (Ping branch)

Production (`two-bits.dev`) deploys from the **`ping`** branch.

```
push to ping ─► GitHub Actions ─► build image ─► ghcr.io/two2bitsdev-creator/two-bits-frontend:ping-<sha>
                                        │
                                        └─► scp deploy/ to VPS ─► ssh: deploy.sh ping-<sha>
                                                                     docker compose pull + up -d

Browser ─► Cloudflare ─► VPS host nginx :443 ─► 127.0.0.1:18420 ─► container :80 (nginx serving the Vite build)
```

| File | Purpose |
| --- | --- |
| `Dockerfile` | Vite build → nginx static image (SPA fallback in `docker/nginx-spa.conf`) |
| `deploy/docker-compose.yml` | `frontend` container on `127.0.0.1:18420`, same slot as the Two Bits build |
| `deploy/deploy.sh` | Runs on the VPS: pull tag, restart, prune old images |
| `deploy/nginx/two-bits.conf` | Host nginx site config (unchanged from `main`; installed once by hand) |
| `.github/workflows/deploy.yml` | CI/CD on every push to `ping` |

The VPS, host nginx, Cloudflare and the `VPS_HOST` / `VPS_USER` / `VPS_SSH_KEY` / `VPS_PORT` secrets are
shared with `main` — see `DEPLOY.md` on the `main` branch for the one-time setup.

## Required repo variable

| Name | Example | Why |
| --- | --- | --- |
| `VITE_API_BASE` | `https://api.two-bits.dev` | Origin of the contact/inbox backend. Inlined at build time; the app throws on startup without it, so the workflow stops before building if it's missing. |

Settings → Secrets and variables → Actions → **Variables** → New repository variable.
Changing it needs a rebuild (re-run the workflow). The backend must allow `https://two-bits.dev` in CORS
with credentials, since `/wp` uses a cookie session.

## Switching production between the two sites

- **Ping (default):** push to `ping`, or Actions → *Build & Deploy (Ping)* → Run workflow.
- **Two Bits (Next.js):** Actions → *Build & Deploy* → Run workflow on `main`. Pushes to `main` no longer deploy.

Both builds use the same container name and port, so each deploy replaces the other.

## Rollback

On the VPS: `cd /opt/two-bits/frontend && ./deploy.sh ping-<older-sha>` (the last 3 images are kept).
