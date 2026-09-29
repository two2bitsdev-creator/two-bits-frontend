#!/usr/bin/env bash
# Runs on the VPS. Pulls the requested image tag and restarts the stack.
#   Usage: ./deploy.sh [image-tag]      (defaults to the tag saved in .env, then "ping-latest")
set -euo pipefail

cd "$(dirname "$0")"
IMAGE=ghcr.io/two2bitsdev-creator/two-bits-frontend

TAG="${1:-${IMAGE_TAG:-}}"
if [[ -z "$TAG" && -f .env ]]; then
  TAG="$(grep -E '^IMAGE_TAG=' .env | cut -d= -f2 || true)"
fi
TAG="${TAG:-ping-latest}"

# Remember the deployed tag so plain `docker compose up -d` and rollbacks use it.
echo "IMAGE_TAG=$TAG" > .env

echo "==> Deploying $IMAGE:$TAG"
docker compose pull frontend
docker compose up -d --remove-orphans --wait

# Keep the 3 most recent images for quick rollback, drop the rest.
docker image ls "$IMAGE" --format '{{.ID}}' | awk '!seen[$0]++' | tail -n +4 \
  | xargs -r docker image rm >/dev/null 2>&1 || true

docker compose ps
echo "==> Done"
