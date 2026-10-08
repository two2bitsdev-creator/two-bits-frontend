import { Fragment, useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, LogOut, RefreshCcw } from "lucide-react";

import { Card } from "@/components/ui/card";
import { fetchClientRequests, logoutWp, authMe } from "@/lib/api";
import { twoBitsLogo } from "@/assets";
import { headerNavTabBase, headerNavTabClassName } from "@/lib/headerNavTab";
import { surfaceMuted } from "@/lib/surface";
import { cn } from "@/lib/utils";

export default function WpDashboard() {
  const navigate = useNavigate();
  const [loadingGate, setLoadingGate] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [email, setEmail] = useState("");
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loadingList, setLoadingList] = useState(false);
  const [expandId, setExpandId] = useState(null);
  const limit = 15;

  const boot = useCallback(async () => {
    setLoadingGate(true);
    try {
      const me = await authMe();
      if (!me.ok || !me.authenticated) {
        navigate("/wp", { replace: true });
        return;
      }
      setAuthorized(true);
      setEmail(me.email || "");
    } catch {
      navigate("/wp", { replace: true });
    } finally {
      setLoadingGate(false);
    }
  }, [navigate]);

  const loadRequests = useCallback(async () => {
    setLoadingList(true);
    try {
      const data = await fetchClientRequests({ page, limit });
      setRows(data.items || []);
      setTotal(data.total || 0);
    } catch {
      setRows([]);
    } finally {
      setLoadingList(false);
    }
  }, [page]);

  useEffect(() => {
    boot();
  }, [boot]);

  useEffect(() => {
    if (authorized) loadRequests();
  }, [authorized, loadRequests]);

  const signOut = async () => {
    try {
      await logoutWp();
    } finally {
      navigate("/wp", { replace: true });
    }
  };

  if (loadingGate) {
    return (
      <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#000000] text-n-3 supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
        <div className="h-0.5 w-full shrink-0 bg-color-1 opacity-95" aria-hidden />
        <div className="flex flex-1 items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-color-1" aria-label="Loading" />
        </div>
      </div>
    );
  }

  if (!authorized) return null;

  const totalPages = Math.max(1, Math.ceil(total / limit));

  return (
    <div className="min-h-[100dvh] bg-[#000000] text-n-1 supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <header className="sticky top-0 z-20 w-full">
        <div className="h-0.5 w-full bg-color-1 opacity-95" aria-hidden />
        <div className="border-b border-n-6/80 bg-[#000000] shadow-[0_8px_32px_-12px_rgba(0,0,0,0.65)]">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-5 sm:py-4 md:px-8">
            <div className="flex min-w-0 flex-1 items-center gap-3 sm:gap-4">
              <img src={twoBitsLogo} alt="Two Bits" className="h-7 w-auto shrink-0 object-contain opacity-95 sm:h-8" width={604} height={110} />
              <div className="min-w-0 font-code text-[10px] uppercase leading-tight tracking-wide text-n-4 sm:text-xs">
                <span className="hidden text-n-5 sm:inline">Inbox · </span>
                <span className="block truncate text-n-2 sm:inline">{email}</span>
              </div>
            </div>
            <div className="flex shrink-0 items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => loadRequests()}
                disabled={loadingList}
                className={cn(
                  headerNavTabClassName(false),
                  "gap-1.5 px-2.5 py-2 disabled:pointer-events-none disabled:opacity-45 sm:gap-2 sm:px-3"
                )}
                aria-label="Refresh list"
              >
                <RefreshCcw className={`h-4 w-4 shrink-0 ${loadingList ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                type="button"
                onClick={() => signOut()}
                className={cn(
                  headerNavTabBase,
                  "gap-1.5 rounded-md border border-red-900/45 bg-[#000000] px-2.5 py-2 font-code text-[10px] font-semibold uppercase tracking-[0.12em] text-red-200 shadow-none transition-all duration-200 hover:bg-red-950/25 hover:text-red-100 hover:ring-1 hover:ring-inset hover:ring-red-500/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#000000] sm:px-3 sm:text-xs"
                )}
                aria-label="Log out"
              >
                <LogOut className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">Log out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-5 sm:py-8 md:px-8 md:py-10">
        <div className="mb-6 flex flex-col gap-3 sm:mb-8 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
          <div className="min-w-0">
            <h1 className="font-grotesk text-2xl font-semibold tracking-tight text-n-1 sm:text-3xl">Client requests</h1>
            <p className="mt-1.5 text-xs text-n-4 sm:mt-2 sm:text-sm">
              {total} submission{total === 1 ? "" : "s"} · newest first · read-only ledger
            </p>
          </div>
          <Link
            to="/#contact"
            className="shrink-0 font-code text-[10px] uppercase tracking-[0.18em] text-color-1 decoration-color-1/40 underline-offset-2 hover:text-color-3 hover:underline sm:text-xs"
          >
            View live form →
          </Link>
        </div>

        <Card className={cn(surfaceMuted, "overflow-hidden border-n-6/90 bg-app-black text-n-1 shadow-lg shadow-black/25")}>
          <div className="md:hidden">
            {loadingList && rows.length === 0 ? (
              <div className="flex justify-center py-14 text-n-4">
                <Loader2 className="h-8 w-8 animate-spin text-color-1" aria-hidden />
              </div>
            ) : null}
            {rows.length === 0 && !loadingList ? (
              <p className="px-4 py-12 text-center text-sm text-n-4">
                No submissions yet — they&apos;ll appear here when visitors use the Contact form.
              </p>
            ) : null}
            <ul className="divide-y divide-n-6/60">
              {rows.map((r) => (
                <li key={r.id} className="px-4 py-4">
                  <p className="font-mono text-[10px] text-n-5">{formatWhen(r.createdAt)}</p>
                  <p className="mt-2 font-medium leading-snug text-n-1">{r.fullName}</p>
                  <p className="mt-0.5 text-sm text-n-3">{r.companyName}</p>
                  <a
                    className="mt-2 block break-all text-sm text-color-1 hover:text-color-3 hover:underline"
                    href={`mailto:${encodeURIComponent(r.email)}`}
                  >
                    {r.email}
                  </a>
                  <p className="mt-2 text-sm text-n-3">{r.phone}</p>
                  {r.message ? (
                    <div className="mt-3">
                      <button
                        type="button"
                        className={cn(headerNavTabClassName(false), "text-xs")}
                        onClick={() => setExpandId((cur) => (cur === r.id ? null : r.id))}
                      >
                        {expandId === r.id ? "Hide message" : "Show message"}
                      </button>
                      {expandId === r.id ? (
                        <p className="mt-2 whitespace-pre-wrap rounded-md border border-n-6/70 bg-white/[0.04] p-3 text-sm leading-relaxed text-n-3">
                          {r.message}
                        </p>
                      ) : null}
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>

          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[640px] border-collapse text-left text-sm">
              <thead className="border-b border-n-6/80 bg-white/[0.04] font-code text-xs uppercase tracking-wider text-n-4">
                <tr>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">When</th>
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium">Company</th>
                  <th className="whitespace-nowrap px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Phone</th>
                  <th className="px-4 py-3 font-medium w-24">Notes</th>
                </tr>
              </thead>
              <tbody>
                {rows.length === 0 && !loadingList ? (
                  <tr>
                    <td colSpan={6} className="px-4 py-12 text-center text-n-4">
                      No submissions yet — they&apos;ll appear here when visitors use the Contact form.
                    </td>
                  </tr>
                ) : (
                  rows.map((r) => (
                    <Fragment key={r.id}>
                      <tr
                        className={`border-t border-n-6/60 transition-colors hover:bg-white/[0.04] ${expandId === r.id ? "bg-white/[0.03]" : ""}`}
                      >
                        <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-n-5">
                          {formatWhen(r.createdAt)}
                        </td>
                        <td className="px-4 py-3 font-medium text-n-1">{r.fullName}</td>
                        <td className="px-4 py-3 text-n-3">{r.companyName}</td>
                        <td className="whitespace-nowrap px-4 py-3">
                          <a
                            className="text-color-1 hover:text-color-3 hover:underline"
                            href={`mailto:${encodeURIComponent(r.email)}`}
                          >
                            {r.email}
                          </a>
                        </td>
                        <td className="px-4 py-3 text-n-3">{r.phone}</td>
                        <td className="px-4 py-3">
                          {r.message ? (
                            <button
                              type="button"
                              className={cn(headerNavTabClassName(false), "h-auto min-h-0 px-2 py-1 text-[11px]")}
                              onClick={() => setExpandId((cur) => (cur === r.id ? null : r.id))}
                            >
                              {expandId === r.id ? "Hide" : "Show"}
                            </button>
                          ) : (
                            <span className="text-n-5">—</span>
                          )}
                        </td>
                      </tr>
                      {expandId === r.id && r.message ? (
                        <tr className="bg-white/[0.03]">
                          <td colSpan={6} className="px-4 pb-4 pt-0 text-sm leading-relaxed text-n-3">
                            <span className="font-code text-xs uppercase tracking-wide text-color-1">Message</span>
                            <p className="mt-2 whitespace-pre-wrap">{r.message}</p>
                          </td>
                        </tr>
                      ) : null}
                    </Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-n-6/80 px-3 py-3 text-xs sm:gap-4 sm:px-4 sm:text-sm">
            <span className="font-code text-n-4">
              Page {page} / {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className={cn(headerNavTabClassName(false), "px-3 py-2 text-xs disabled:pointer-events-none disabled:opacity-45")}
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= totalPages}
                onClick={() => setPage((p) => p + 1)}
                className={cn(headerNavTabClassName(false), "px-3 py-2 text-xs disabled:pointer-events-none disabled:opacity-45")}
              >
                Next
              </button>
            </div>
          </div>
        </Card>
      </main>
    </div>
  );
}

function formatWhen(iso) {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return String(iso);
  }
}
