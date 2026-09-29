/**
 * JSON API helpers. Base URL always comes from `VITE_API_BASE` in `frontend/.env`
 * (loaded by Vite into `import.meta.env`). No same-origin fallback — set the var
 * on every machine (local + deploy). See `frontend/.env.example`.
 */
function getApiBase() {
  const raw = import.meta.env.VITE_API_BASE;
  if (typeof raw !== "string" || !raw.trim()) {
    throw new Error(
      "VITE_API_BASE is missing or empty. Set it in frontend/.env (e.g. http://localhost:4000 for local API). See frontend/.env.example."
    );
  }
  return raw.trim().replace(/\/$/, "");
}

const base = getApiBase();

export async function apiFetch(path, options = {}) {
  const url = `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(options.headers);
  if (options.body !== undefined && !(options.body instanceof FormData) && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  const res = await fetch(url, {
    ...options,
    headers,
    credentials: options.credentials ?? "include",
  });
  let data = null;
  try {
    data = await res.json();
  } catch {
    data = null;
  }
  if (!res.ok) {
    const err = new Error(data?.error || res.statusText || "Request failed");
    err.status = res.status;
    err.body = data;
    throw err;
  }
  return data;
}

export function submitContactRequest(payload) {
  return apiFetch("/api/v1/contact-requests", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "omit",
  });
}

export function loginWp(email, password) {
  return apiFetch("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logoutWp() {
  return apiFetch("/api/v1/auth/logout", { method: "POST" });
}

export function authMe() {
  return apiFetch("/api/v1/auth/me");
}

export function fetchClientRequests(params = {}) {
  const qs = new URLSearchParams(params);
  const q = qs.toString();
  return apiFetch(`/api/v1/dashboard/client-requests${q ? `?${q}` : ""}`, { method: "GET" });
}
