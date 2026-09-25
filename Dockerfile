# syntax=docker/dockerfile:1

# ---- deps: install node_modules from the lockfile ----
FROM node:22-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder: compile the standalone server ----
FROM node:22-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* values are inlined into the bundle at build time,
# so they must be supplied as build args (see .github/workflows/deploy.yml).
ARG NEXT_PUBLIC_SITE_URL=https://two-bits.dev
ARG NEXT_PUBLIC_CONTACT_EMAIL=hello@two-bits.dev
ARG NEXT_PUBLIC_DEFAULT_THEME=light
ARG NEXT_PUBLIC_MOTION=showpiece
ARG NEXT_PUBLIC_RAIN_DENSITY=14
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL \
    NEXT_PUBLIC_CONTACT_EMAIL=$NEXT_PUBLIC_CONTACT_EMAIL \
    NEXT_PUBLIC_DEFAULT_THEME=$NEXT_PUBLIC_DEFAULT_THEME \
    NEXT_PUBLIC_MOTION=$NEXT_PUBLIC_MOTION \
    NEXT_PUBLIC_RAIN_DENSITY=$NEXT_PUBLIC_RAIN_DENSITY \
    NEXT_TELEMETRY_DISABLED=1

RUN npm run build

# ---- runner: minimal runtime image ----
FROM node:22-alpine AS runner
LABEL org.opencontainers.image.source=https://github.com/two2bitsdev-creator/two-bits-frontend
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

RUN addgroup -S -g 1001 nodejs && adduser -S -u 1001 -G nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["node", "server.js"]
