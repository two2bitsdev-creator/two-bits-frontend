"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Blueprint } from "@/components/blueprint/blueprint";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { login } from "@/lib/api";

function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      router.replace("/wp/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not sign in");
      setLoading(false);
    }
  }

  return (
    <div className="m-auto w-full max-w-md px-4 py-16 sm:py-24">
      <h6 className="mb-3.5 text-[var(--tb-ink-accent)]">Operators only</h6>
      <h1 className="mb-3 text-[clamp(1.75rem,7vw,2.5rem)] leading-[1.04] tracking-[-0.02em]">
        SIGN IN TO THE INBOX
      </h1>
      <p className="text-muted-foreground mb-8 text-[14px] leading-relaxed">
        Client briefs submitted from the public site. Sessions live in an
        HTTP-only cookie.
      </p>

      <Blueprint className="border-border bg-background border p-5 sm:p-7">
        <form onSubmit={handleSubmit} className="grid gap-4.5">
          <div className="grid gap-1.5">
            <Label htmlFor="wp-email">Email</Label>
            <Input
              id="wp-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@two-bits.dev"
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="wp-password">Password</Label>
            <Input
              id="wp-password"
              type="password"
              autoComplete="current-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8+ characters"
            />
          </div>

          {error && (
            <p
              role="alert"
              className="border-destructive/50 text-destructive border px-3.5 py-2.5 font-mono text-[12px]"
            >
              ✗ {error}
            </p>
          )}

          <Blueprint>
            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full py-3.5 text-[14px] tracking-wide"
            >
              {loading ? "SIGNING IN…" : "SIGN IN"}
            </Button>
          </Blueprint>
        </form>
      </Blueprint>
    </div>
  );
}

export { LoginForm };
