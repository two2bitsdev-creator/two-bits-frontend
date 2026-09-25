# Deployment

```
push to main ─► GitHub Actions ─► build image ─► ghcr.io/two2bitsdev-creator/two-bits-frontend:<sha>
                                        │
                                        └─► scp deploy/ to VPS ─► ssh: deploy.sh <sha>
                                                                     docker compose pull + up -d

Browser ─► Cloudflare (proxied, Full strict) ─► VPS host nginx :443 (Origin cert) ─► 127.0.0.1:18420 ─► container :3000
```

| File | Purpose |
| --- | --- |
| `Dockerfile` | Multi-stage build → minimal Next.js `standalone` image (non-root, healthcheck) |
| `deploy/docker-compose.yml` | `frontend` container, published on `127.0.0.1:18420` only |
| `deploy/nginx/two-bits.conf` | Site config for the VPS's **host nginx**: HTTP→HTTPS, www→apex, Cloudflare real-IP, reverse proxy (installed once by hand, step 1.5) |
| `deploy/deploy.sh` | Runs on the VPS: pull tag, restart, prune old images |
| `.github/workflows/deploy.yml` | CI/CD on every push to `main` |

---

## 1. One-time VPS setup

SSH into the VPS by **IP** (`two-bits.dev` goes through Cloudflare, which does not proxy SSH):

```bash
ssh root@76.13.55.119
```

### 1.1 Docker

```bash
docker --version && docker compose version   # both must work
# If missing: curl -fsSL https://get.docker.com | sh
```

### 1.2 Deploy user (used by GitHub Actions)

```bash
adduser --disabled-password --gecos "" deploy
usermod -aG docker deploy
mkdir -p /opt/two-bits/frontend
chown -R deploy:deploy /opt/two-bits
```

### 1.3 SSH key for GitHub Actions (reuse your existing key)

On your **local machine**, find your existing key pair:

```bash
ls ~/.ssh/                     # e.g. id_ed25519 + id_ed25519.pub (or id_rsa + id_rsa.pub)
```

The examples below use `~/.ssh/id_ed25519`. Replace it with your key's file name.

Print your **public** key locally:

```bash
cat ~/.ssh/id_ed25519.pub      # ssh-ed25519 AAAA... you@host
```

On the **VPS as root**, authorize it for `deploy` (paste the whole line between the quotes).
`deploy` has no password, so `ssh-copy-id` cannot do this step:

```bash
mkdir -p /home/deploy/.ssh
echo 'ssh-ed25519 AAAA...your-public-key... you@host' >> /home/deploy/.ssh/authorized_keys
chown -R deploy:deploy /home/deploy/.ssh
chmod 700 /home/deploy/.ssh && chmod 600 /home/deploy/.ssh/authorized_keys
```

Back on your **local machine**, check that it works:

```bash
ssh -i ~/.ssh/id_ed25519 deploy@76.13.55.119 'docker ps && touch /opt/two-bits/frontend/.ok && echo OK'
```

This must print `OK` without asking for a password.

The **private** key (`~/.ssh/id_ed25519`, the file **without** `.pub`) goes into the GitHub secret `VPS_SSH_KEY` (step 2):

```bash
cat ~/.ssh/id_ed25519          # copy everything, including the BEGIN/END lines
```

> The workflow expects a key **without a passphrase**. To check, run `ssh-keygen -y -f ~/.ssh/id_ed25519`:
> if it asks for a passphrase, the key has one. In that case the workflow needs a `passphrase` input on both SSH steps.

### 1.4 Cloudflare Origin certificate

Save the PEM you generated in *SSL/TLS → Origin Server*:

```bash
sudo mkdir -p /etc/ssl/two-bits
sudo nano /etc/ssl/two-bits/cert.pem    # paste "Origin Certificate"  (-----BEGIN CERTIFICATE-----)
sudo nano /etc/ssl/two-bits/key.pem     # paste "Private Key"         (-----BEGIN PRIVATE KEY-----)
sudo chown root:root /etc/ssl/two-bits/*.pem
sudo chmod 644 /etc/ssl/two-bits/cert.pem
sudo chmod 600 /etc/ssl/two-bits/key.pem
sudo openssl x509 -in /etc/ssl/two-bits/cert.pem -noout -subject -dates   # sanity check
```

The file names must be exactly `cert.pem` and `key.pem` (the nginx config refers to them).
nginx's master process runs as root, so it can read a key file set to `600`.

### 1.5 Host nginx site

The VPS already runs nginx on the host for the other sites. That nginx owns ports 80/443, and each app
container publishes only on `127.0.0.1:<port>`. This site follows the same pattern: the container listens on
`127.0.0.1:18420`, and host nginx proxies `two-bits.dev` to it.

First confirm that the proxy on 80/443 is nginx:

```bash
sudo ss -tlnp | grep -E ':(80|443) '     # should show "nginx"
nginx -v
```

Install the site. Copy `deploy/nginx/two-bits.conf` from the repo; one way is from your **local machine**:

```bash
scp deploy/nginx/two-bits.conf root@76.13.55.119:/etc/nginx/sites-available/two-bits.dev
```

Then on the **VPS as root**:

```bash
ln -s /etc/nginx/sites-available/two-bits.dev /etc/nginx/sites-enabled/two-bits.dev
nginx -t && systemctl reload nginx
```

Always run `nginx -t` before reloading. If the test fails, nginx keeps running with its old config, so the
other sites are not affected.

> If your nginx has no `sites-available`/`sites-enabled` folders (`ls /etc/nginx`), put the file at
> `/etc/nginx/conf.d/two-bits.dev.conf` instead.
>
> If nginx is **1.25.1 or newer**, `nginx -t` warns that `listen ... http2` is deprecated. The warning is
> harmless. To silence it, change `listen 443 ssl http2;` to `listen 443 ssl;` plus a separate `http2 on;` line.

Ports 80/443 are already open for the other sites, so the firewall needs no changes.

---

## 2. GitHub setup

Repo → **Settings → Secrets and variables → Actions**

**Secrets**

| Name | Value |
| --- | --- |
| `VPS_HOST` | `76.13.55.119` |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | contents of your existing private key, e.g. `~/.ssh/id_ed25519` (including BEGIN/END lines) |
| `VPS_PORT` | *(optional)*, only if SSH is not on port 22 |

**Variables** (optional; the defaults in the workflow match `.env.example`)

`NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_CONTACT_EMAIL`, `NEXT_PUBLIC_DEFAULT_THEME`,
`NEXT_PUBLIC_MOTION`, `NEXT_PUBLIC_RAIN_DENSITY`

These values are baked into the image at build time, so changing one requires a rebuild (re-run the workflow).

No registry token is needed. The workflow pushes to GHCR with the built-in `GITHUB_TOKEN`, and the VPS
logs in with that same short-lived token only for the pull, then logs out.

---

## 3. Cloudflare settings

- **SSL/TLS → Overview → Encryption mode: `Full (strict)`**. This is required: with *Flexible* you get a redirect loop.
- **SSL/TLS → Edge Certificates → Always Use HTTPS: On**
- *(optional)* `www` → add `CNAME www two-bits.dev` (Proxied). nginx redirects it to the apex.

---

## 4. First deploy

```bash
git push origin main
```

Watch it under **Actions → Build & Deploy**. Then on the VPS:

```bash
ls -la /opt/two-bits/frontend           # docker-compose.yml, deploy.sh, .env
docker ps --filter name=two-bits        # two-bits-frontend  Up (healthy)  127.0.0.1:18420->3000/tcp
curl -I http://127.0.0.1:18420          # the app itself → 200
curl -I https://two-bits.dev            # through Cloudflare + host nginx → 200
```

From then on, **every push to `main` deploys automatically**. To redeploy without a code change:
**Actions → Build & Deploy → Run workflow**.

---

## 5. Operations (on the VPS, in `/opt/two-bits/frontend`)

```bash
docker compose logs -f frontend         # app logs
cat .env                                # currently deployed tag

sudo tail -f /var/log/nginx/two-bits.access.log /var/log/nginx/two-bits.error.log
sudo nginx -t && sudo systemctl reload nginx   # after editing the site or replacing the certificate
```

**Rollback** to a previous build (tags are the 7-character commit SHAs):

```bash
./deploy.sh <old-sha>
```

The last 3 images are kept locally, so rolling back to one of them works without pulling. Rolling back to an
older tag needs registry access: run `docker login ghcr.io` with a classic PAT that has `read:packages`,
or make the package public (GitHub → Packages → two-bits-frontend → Package settings).

---

## 6. Test the image locally

```bash
docker build -t two-bits-frontend:local .
docker run --rm -p 3000:3000 two-bits-frontend:local   # → http://localhost:3000
```

## Troubleshooting

| Symptom | Cause / fix |
| --- | --- |
| Cloudflare **526** | Encryption mode is not *Full (strict)* with the Origin cert, or the cert/key are wrong or swapped |
| Cloudflare **521 / 522** | Host nginx is not running, or 80/443 is blocked by the firewall or VPS provider |
| **502 Bad Gateway** | The container is down or unhealthy: check `docker ps --filter name=two-bits` and `docker compose logs frontend` |
| Another site shows up on two-bits.dev | The site config is not enabled, or nginx was not reloaded (step 1.5) |
| **Too many redirects** | Encryption mode is *Flexible*; set it to *Full (strict)* |
| Actions: `permission denied (publickey)` | Wrong `VPS_SSH_KEY`, or the public key is missing from `~deploy/.ssh/authorized_keys` |
| Actions: `denied` on pull | Workflow `packages: read` permission missing, or the package is not linked to the repo |
| Actions: `address already in use` on 18420 | Another container took that port; change it in `docker-compose.yml` **and** in the nginx `upstream` |
