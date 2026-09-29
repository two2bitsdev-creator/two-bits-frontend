import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { loginWp } from "@/lib/api";
import { pingLogoPng } from "@/assets";
import { ctaNavButtonClassName } from "@/lib/ctaNavButton";
import { headerNavTabClassName } from "@/lib/headerNavTab";
import { surfaceCard, surfaceMuted } from "@/lib/surface";
import { cn } from "@/lib/utils";

export default function WpLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await loginWp(email, password);
      navigate("/wp/dashboard", { replace: true });
    } catch (err) {
      setError(err.body?.error || err.message || "Could not sign in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[100dvh] flex-col bg-[#000000] text-n-1 supports-[padding:max(0px)]:pt-[env(safe-area-inset-top)]">
      <div className="h-0.5 w-full shrink-0 bg-color-1 opacity-95" aria-hidden />
      <div className="grid min-h-0 flex-1 lg:grid-cols-2">
        <div className="relative hidden flex-col justify-between border-r border-n-6/80 bg-[#000000] p-10 lg:flex">
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-gradient-to-br from-color-1/[0.04] via-transparent to-transparent" />
          <Link
            to="/"
            className={cn(
              headerNavTabClassName(false),
              "relative z-[1] inline-flex w-fit max-w-full items-center gap-3 py-2.5 pl-2.5 pr-4"
            )}
          >
            <img src={pingLogoPng} alt="" className="h-9 w-auto object-contain" width={140} height={40} />
            <span className="font-code text-[10px] uppercase tracking-[0.18em] text-n-3">← Site</span>
          </Link>
          <div className="relative z-[1] flex flex-1 flex-col justify-center py-12">
            <div className={cn(surfaceMuted, "mx-auto max-w-md p-8 text-center shadow-lg shadow-black/30")}>
              <p className="font-grotesk text-lg font-semibold tracking-tight text-n-1">Ping workspace</p>
              <p className="mt-2 text-sm text-n-3">
                Review client requests submitted from the public site. Sessions use secure HTTP-only cookies.
              </p>
            </div>
            <p className="mx-auto mt-8 max-w-md text-center text-sm text-n-4">
              Secure workspace · Session stored in HTTP-only cookie · Prefer strong passwords & unique accounts.
            </p>
          </div>
          <p className="relative z-[1] font-code text-[10px] uppercase tracking-wider text-n-4">
            Authorized operators only ·{" "}
            <Link to="/#contact" className="text-color-1 underline decoration-color-1/50 underline-offset-2 hover:text-color-3">
              Contact Ping
            </Link>
          </p>
        </div>

        <div className="flex flex-col justify-center bg-[#000000] px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-12 sm:px-6 sm:py-16 md:px-10">
          <div className="mx-auto w-full max-w-md space-y-8">
            <div className="lg:hidden">
              <Link
                to="/"
                className={cn(headerNavTabClassName(false), "inline-flex w-fit items-center gap-2 py-2 pl-2 pr-3")}
              >
                <img src={pingLogoPng} alt="Ping" className="h-8 w-auto object-contain" width={120} height={32} />
              </Link>
            </div>

            <Card className={cn(surfaceCard, "border-n-6/90 bg-app-black text-n-1 shadow-black/30")}>
              <CardHeader>
                <CardTitle className="font-grotesk text-2xl font-semibold tracking-tight text-n-1">Operator sign-in</CardTitle>
                <CardDescription className="text-n-4">Dashboard for client requests submitted from the public site.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={onSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-code text-[11px] font-semibold uppercase tracking-[0.12em] text-n-4">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="username"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      className="border-n-6 bg-app-black text-n-1 ring-offset-[#000000] placeholder:text-n-2/80 placeholder:opacity-100 focus-visible:border-color-1/50 focus-visible:ring-color-1/35"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="font-code text-[11px] font-semibold uppercase tracking-[0.12em] text-n-4">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      minLength={8}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="8+ characters"
                      className="border-n-6 bg-app-black text-n-1 ring-offset-[#000000] placeholder:text-n-2/80 placeholder:opacity-100 focus-visible:border-color-1/50 focus-visible:ring-color-1/35"
                    />
                  </div>

                  {error ? (
                    <p className="rounded-md border border-red-900/60 bg-red-950/40 px-3 py-2 text-sm text-red-200" role="alert">
                      {error}
                    </p>
                  ) : null}

                  <button type="submit" disabled={loading} className={ctaNavButtonClassName("w-full gap-2")}>
                    {loading ? <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden /> : null}
                    Sign in securely
                  </button>
                </form>
              </CardContent>
            </Card>

            <p className="text-center text-xs text-n-4">
              By continuing you agree this area is restricted. Unauthorized access attempts may be monitored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
