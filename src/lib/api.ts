import { siteConfig } from "@/config/site";
import type { ContactRequest } from "@/types";

/**
 * Client for the contact/inbox backend inherited from the Ping stack. Every
 * call sends cookies by default (the /wp inbox uses an HTTP-only session
 * cookie); the public contact form opts out with `credentials: "omit"`.
 */

export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
    readonly body: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const isApiConfigured = Boolean(siteConfig.apiBase);

async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  if (!siteConfig.apiBase) {
    throw new ApiError("NEXT_PUBLIC_API_BASE is not configured", 0, null);
  }

  const headers = new Headers(init.headers);
  if (init.body !== undefined && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  const res = await fetch(`${siteConfig.apiBase}${path}`, {
    ...init,
    headers,
    credentials: init.credentials ?? "include",
  });

  const data: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const message =
      (data as { error?: string } | null)?.error ||
      res.statusText ||
      "Request failed";
    throw new ApiError(message, res.status, data);
  }
  return data as T;
}

export interface ContactPayload {
  fullName: string;
  email: string;
  companyName?: string;
  phone?: string;
  message?: string;
}

export function submitContactRequest(payload: ContactPayload) {
  return apiFetch<{ ok: boolean }>("/api/v1/contact-requests", {
    method: "POST",
    body: JSON.stringify(payload),
    credentials: "omit",
  });
}

export function login(email: string, password: string) {
  return apiFetch<{ ok: boolean }>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function logout() {
  return apiFetch<{ ok: boolean }>("/api/v1/auth/logout", { method: "POST" });
}

export function authMe() {
  return apiFetch<{ ok: boolean; authenticated: boolean; email?: string }>(
    "/api/v1/auth/me",
  );
}

export function fetchClientRequests(params: { page: number; limit: number }) {
  const qs = new URLSearchParams({
    page: String(params.page),
    limit: String(params.limit),
  });
  return apiFetch<{ items: ContactRequest[]; total: number }>(
    `/api/v1/dashboard/client-requests?${qs}`,
  );
}
