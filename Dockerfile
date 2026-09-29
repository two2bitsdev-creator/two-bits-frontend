# Production image: Vite build + nginx static (build context = repo root)
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . ./

ARG VITE_API_BASE
ENV VITE_API_BASE=${VITE_API_BASE}

# The app throws at startup without an API origin — refuse to build a blank site.
RUN test -n "$VITE_API_BASE" || (echo "VITE_API_BASE build arg is required" >&2 && exit 1)

RUN npm run build

FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY docker/nginx-spa.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
