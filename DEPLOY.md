# Deployment

```
push to main ─► GitHub Actions ─► build image ─► ghcr.io/two2bitsdev-creator/two-bits-frontend:<sha>
                                        │
                                        └─► scp deploy/ to VPS ─► ssh: deploy.sh <sha>
                                                                     docker compose pull + up -d

Browser ─► Cloudflare (proxied, Full strict) ─► VPS :443 nginx (Origin cert) ─► frontend:3000
```

| File | Purpose |
| --- | --- |
| `Dockerfile` | Multi-stage build → minimal Next.js `standalone` image (non-root, healthcheck) |
| `deploy/docker-compose.yml` | `frontend` + `nginx` (TLS on 80/443) |
| `deploy/nginx/two-bits.conf` | HTTP→HTTPS, www→apex, Cloudflare real-IP, reverse proxy |
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

### 1.3 SSH key for GitHub Actions

On your **local machine**:

```bash
ssh-keygen -t ed25519 -C "github-actions-two-bits" -f ~/.ssh/two_bits_deploy -N ""
ssh-copy-id -i ~/.ssh/two_bits_deploy.pub deploy@76.13.55.119
ssh -i ~/.ssh/two_bits_deploy deploy@76.13.55.119 'docker ps'   # must work without sudo
```

The **private** key (`~/.ssh/two_bits_deploy`) goes into the GitHub secret `VPS_SSH_KEY` (step 2).

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

### 1.5 Firewall

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
```

> Ports 80/443 must be free. If another container or a host nginx/apache already binds them,
> check with `sudo ss -tlnp | grep -E ':80|:443'`, then either stop it or add this site to that proxy
> instead of running the `nginx` service here.

---

## 2. GitHub setup

Repo → **Settings → Secrets and variables → Actions**

**Secrets**

| Name | Value |
| --- | --- |
| `VPS_HOST` | `76.13.55.119` |
| `VPS_USER` | `deploy` |
| `VPS_SSH_KEY` | contents of `~/.ssh/two_bits_deploy` (private key, including BEGIN/END lines) |
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
git add -A && git commit -m "Add Docker deployment" && git push origin main
```

Watch it under **Actions → Build & Deploy**. Then on the VPS:

```bash
cd /opt/two-bits/frontend
docker compose ps           # both containers Up (frontend: healthy)
curl -I https://two-bits.dev
```

From then on, **every push to `main` deploys automatically**. To redeploy without a code change:
**Actions → Build & Deploy → Run workflow**.

---

## 5. Operations (on the VPS, in `/opt/two-bits/frontend`)

```bash
docker compose logs -f frontend         # app logs
docker compose logs -f nginx            # access/error logs
docker compose restart nginx            # e.g. after replacing the certificate
cat .env                                # currently deployed tag
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
| Cloudflare **521 / 522** | nginx is not running, or 80/443 is blocked by the firewall or VPS provider |
| **Too many redirects** | Encryption mode is *Flexible*; set it to *Full (strict)* |
| Actions: `permission denied (publickey)` | Wrong `VPS_SSH_KEY`, or the public key is missing from `~deploy/.ssh/authorized_keys` |
| Actions: `denied` on pull | Workflow `packages: read` permission missing, or the package is not linked to the repo |
| nginx: `bind() ... address already in use` | Something else holds 80/443 (see 1.5) |
