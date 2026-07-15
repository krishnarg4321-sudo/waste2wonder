import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import AuroraBackground from "@/components/AuroraBackground";
import BorderGlow from "@/components/BorderGlow";
import DecayCard from "@/components/DecayCard";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [
      { title: "Log In — Waste2Wonder" },
      { name: "description", content: "Log in to Waste2Wonder to continue upcycling and tracking your impact." },
    ],
  }),
});

function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    setBusy(true);
    try {
      await login(email, password);
      router.navigate({ to: "/profile" });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Login failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-foreground">
      <AuroraBackground />
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <BorderGlow
            borderRadius={28}
            glowColor="130 40 55"
            colors={["#E8815A", "#87A878", "#F5EFE0"]}
            backgroundColor="#F5EFE0"
            glowRadius={60}
            animated
          >
            <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
              {/* Left — form */}
              <div className="p-8 md:p-10">
                <Link to="/" className="inline-flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg brutal-border brutal-shadow-sm bg-brand-mint">
                    <span className="h-2.5 w-2.5 rotate-45 bg-brand-ink" />
                  </span>
                  <span className="font-display text-base tracking-tight">Waste2Wonder</span>
                </Link>
                <h1 className="mt-6 text-3xl md:text-4xl">Welcome Back</h1>
                <p className="mt-1 text-sm font-medium text-foreground/70">
                  Log in to continue where you left off.
                </p>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <Field label="Email">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-full rounded-xl border-2 border-brand-ink/20 bg-card px-4 py-3 text-sm font-medium outline-none focus:border-brand-coral"
                    />
                  </Field>
                  <Field label="Password">
                    <div className="relative">
                      <input
                        type={show ? "text" : "password"}
                        required
                        minLength={4}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        className="w-full rounded-xl border-2 border-brand-ink/20 bg-card px-4 py-3 pr-11 text-sm font-medium outline-none focus:border-brand-coral"
                      />
                      <button
                        type="button"
                        onClick={() => setShow((s) => !s)}
                        aria-label={show ? "Hide password" : "Show password"}
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-foreground/60 hover:text-foreground"
                      >
                        {show ? "Hide" : "Show"}
                      </button>
                    </div>
                    <div className="mt-1 text-right">
                      <a href="#" className="text-xs font-bold text-brand-coral hover:underline">
                        Forgot Password?
                      </a>
                    </div>
                  </Field>

                  {err ? (
                    <div className="rounded-lg brutal-border bg-brand-coral/25 px-3 py-2 text-sm font-semibold">
                      {err}
                    </div>
                  ) : null}

                  <button
                    type="submit"
                    disabled={busy}
                    className="w-full rounded-xl brutal-border brutal-shadow bg-brand-coral px-6 py-3 text-base font-bold transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-70"
                  >
                    {busy ? "Logging in…" : "Log In"}
                  </button>

                  <div className="flex items-center gap-3 py-1">
                    <span className="h-px flex-1 bg-brand-ink/20" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/60">Or</span>
                    <span className="h-px flex-1 bg-brand-ink/20" />
                  </div>

                  <div className="flex justify-center gap-3">
                    {["F", "G", "X"].map((l) => (
                      <button
                        type="button"
                        key={l}
                        aria-label={`Continue with ${l}`}
                        className="grid h-11 w-11 place-items-center rounded-full brutal-border brutal-shadow-sm bg-card font-display text-sm transition-transform hover:-translate-y-0.5"
                      >
                        {l}
                      </button>
                    ))}
                  </div>

                  <p className="pt-2 text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="font-bold text-brand-coral hover:underline">
                      Sign Up
                    </Link>
                  </p>
                </form>
              </div>

              {/* Right — themed illustration panel (DecayCard, no phone mascot) */}
              <div className="relative hidden overflow-hidden bg-[color-mix(in_oklab,var(--brand-mint)_55%,white)] md:block">
                <SparkleField />
                <div className="relative flex h-full items-center justify-center p-8">
                  <DecayCard
                    width={320}
                    height={420}
                    image="https://images.unsplash.com/photo-1493552832879-9147d504dbd7?w=800&q=80"
                  >
                    <h2 style={{ margin: 0, lineHeight: 0.95 }}>
                      Waste<br />Reborn.
                    </h2>
                  </DecayCard>
                </div>
              </div>
            </div>
          </BorderGlow>
        </motion.div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-bold">{label}</span>
      {children}
    </label>
  );
}

function SparkleField() {
  const pts = [
    { top: "8%", left: "12%", size: 14 }, { top: "22%", left: "78%", size: 20 },
    { top: "48%", left: "8%", size: 12 }, { top: "68%", left: "82%", size: 16 },
    { top: "82%", left: "20%", size: 18 }, { top: "34%", left: "44%", size: 10 },
  ];
  return (
    <>
      {pts.map((p, i) => (
        <svg
          key={i}
          width={p.size}
          height={p.size}
          viewBox="0 0 24 24"
          className="absolute animate-float"
          style={{ top: p.top, left: p.left, animationDelay: `${i * 0.6}s`, color: "var(--brand-ink)" }}
          fill="currentColor"
          aria-hidden
        >
          <path d="M12 2l2.4 6.8L21 11l-6.6 2.2L12 20l-2.4-6.8L3 11l6.6-2.2L12 2z" />
        </svg>
      ))}
    </>
  );
}