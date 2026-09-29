"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { authMe, fetchClientRequests, logout } from "@/lib/api";
import { cn } from "@/lib/utils";
import type { ContactRequest } from "@/types";

const PAGE_SIZE = 15;

/**
 * Read-only ledger of contact-form submissions. Self-guards: bounces to
 * /wp when the session cookie is missing or expired.
 */
function RequestsInbox() {
  const router = useRouter();
  const [operator, setOperator] = useState<string | null>(null);
  const [rows, setRows] = useState<ContactRequest[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    authMe()
      .then((me) => {
        if (cancelled) return;
        if (!me.ok || !me.authenticated) router.replace("/wp");
        else setOperator(me.email ?? "operator");
      })
      .catch(() => {
        if (!cancelled) router.replace("/wp");
      });
    return () => {
      cancelled = true;
    };
  }, [router]);

  const load = useCallback(async (target: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchClientRequests({ page: target, limit: PAGE_SIZE });
      setRows(data.items ?? []);
      setTotal(data.total ?? 0);
    } catch (err) {
      setRows([]);
      setError(err instanceof Error ? err.message : "Could not load requests");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!operator) return;
    // Fetch-on-change; state is only set after the request resolves.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void load(page);
  }, [operator, page, load]);

  async function signOut() {
    try {
      await logout();
    } finally {
      router.replace("/wp");
    }
  }

  if (!operator) {
    return (
      <div className="m-auto flex items-center gap-3 font-mono text-[13px]">
        <span className="animate-tb-spin border-primary size-3.5 rounded-full border-[1.5px] border-t-transparent" />
        checking session…
      </div>
    );
  }

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div className="mx-auto w-full max-w-[1280px] px-4 py-10 sm:px-6 sm:py-14 md:px-10">
      <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h6 className="mb-3 truncate text-[var(--tb-ink-accent)]">
            Inbox · {operator}
          </h6>
          <h1 className="text-[clamp(1.75rem,7vw,2.5rem)] tracking-[-0.02em]">
            CLIENT REQUESTS
          </h1>
          <p className="text-muted-foreground mt-1.5 font-mono text-[12px]">
            {total} submission{total === 1 ? "" : "s"} · newest first ·
            read-only
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="lg"
            disabled={loading}
            onClick={() => void load(page)}
            className="font-mono text-[12px] tracking-wide"
          >
            {loading ? "LOADING…" : "REFRESH"}
          </Button>
          <Button
            variant="destructive"
            size="lg"
            onClick={() => void signOut()}
            className="font-mono text-[12px] tracking-wide"
          >
            LOG OUT
          </Button>
        </div>
      </div>

      <div className="border-border bg-border grid gap-px border">
        <div className="bg-secondary text-muted-foreground hidden grid-cols-[10rem_1fr_1fr_9rem] gap-4 px-4 py-3 font-mono text-[11px] tracking-[0.14em] uppercase md:grid">
          <span>When</span>
          <span>Name · company</span>
          <span>Email</span>
          <span>Phone</span>
        </div>

        {error && (
          <p className="bg-background text-destructive px-4 py-10 text-center font-mono text-[13px]">
            ✗ {error}
          </p>
        )}

        {!error && rows.length === 0 && !loading && (
          <p className="bg-background text-muted-foreground px-4 py-12 text-center text-sm">
            No submissions yet — they&apos;ll land here when visitors send the
            contact form.
          </p>
        )}

        {rows.map((row) => (
          <RequestRow key={row.id} row={row} />
        ))}

        <div className="bg-background flex items-center justify-between gap-3 px-4 py-3 font-mono text-[12px]">
          <span className="text-muted-foreground">
            page {page} / {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              disabled={page <= 1 || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              ← PREV
            </Button>
            <Button
              variant="outline"
              disabled={page >= totalPages || loading}
              onClick={() => setPage((p) => p + 1)}
            >
              NEXT →
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestRow({ row }: { row: ContactRequest }) {
  const body = (
    <div className="grid gap-1.5 md:grid-cols-[10rem_1fr_1fr_9rem] md:items-baseline md:gap-4">
      <span className="text-muted-foreground font-mono text-[11px]">
        {formatWhen(row.createdAt)}
      </span>
      <span className="min-w-0">
        <span className="font-medium">{row.fullName}</span>
        {row.companyName && (
          <span className="text-muted-foreground"> · {row.companyName}</span>
        )}
      </span>
      <a
        href={`mailto:${encodeURIComponent(row.email)}`}
        onClick={(e) => e.stopPropagation()}
        className="min-w-0 truncate text-[14px]"
      >
        {row.email}
      </a>
      <span className="text-muted-foreground text-[14px]">{row.phone || "—"}</span>
    </div>
  );

  if (!row.message) {
    return <div className="bg-background px-4 py-3.5">{body}</div>;
  }

  return (
    <details className="group bg-background open:bg-[color-mix(in_srgb,var(--primary)_6%,var(--background))]">
      <summary
        className={cn(
          "cursor-pointer list-none px-4 py-3.5 [&::-webkit-details-marker]:hidden",
          "transition-colors hover:bg-[color-mix(in_srgb,var(--primary)_6%,var(--background))]",
        )}
      >
        {body}
        <span className="text-primary mt-1.5 block font-mono text-[10px] tracking-[0.18em] uppercase">
          <span className="group-open:hidden">+ show brief</span>
          <span className="hidden group-open:inline">− hide brief</span>
        </span>
      </summary>
      <p className="border-border mx-4 mb-4 border-l-2 pl-4 text-[14px] leading-relaxed whitespace-pre-wrap">
        {row.message}
      </p>
    </details>
  );
}

function formatWhen(iso: string) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export { RequestsInbox };
