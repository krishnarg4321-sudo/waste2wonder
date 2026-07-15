import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import AuroraBackground from "@/components/AuroraBackground";
import BorderGlow from "@/components/BorderGlow";
import DecayCard from "@/components/DecayCard";
import { useAuth } from "@/lib/auth";

export const Route = createFileRoute("/signup")({
  component: SignupPage,
  head: () => ({
    meta: [
      { title: "Create Account — Waste2Wonder" },
      { name: "description", content: "Create your Waste2Wonder account and start turning waste into wonder." },
    ],
  }),
});

function SignupPage() {
  const { signup } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setErr(null);
    if (password !== confirm) { setErr("Passwords don't match."); return; }
    setBusy(true);
    try {
      await signup(name, email, password);
      router.navigate({ to: "/profile" });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Signup failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-foreground">
      <AuroraBackground />
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="w-full">
          <BorderGlow
            borderRadius={28}
            glowColor="20 80 65"
            colors={["#87A878", "#E8815A", "#F5EFE0"]}
            backgroundColor="#F5EFE0"
            glowRadius={60}
            animated
          >
            <div className="grid gap-0 md:grid-cols-[1.15fr_0.85fr]">
              <div className="p-8 md:p-10">
                <Link to="/" className="inline-flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg brutal-border brutal-shadow-sm bg-brand-mint">
                    <span className="h-2.5 w-2.5 rotate-45 bg-brand-ink" />
                  </span>
                  <span className="font-display text-base tracking-tight">Waste2Wonder</span>
                </Link>
                <h1 className="mt-6 text-3xl md:text-4xl">Create Your Account</h1>
                <p className="mt-1 text-sm font-medium text-foreground/70">
                  Let's set you up in just a few steps.
                </p>

                <form onSubmit={onSubmit} className="mt-6 space-y-4">
                  <label className="block">
                    <span className="mb-1 block text-sm font-bold">Name</span>
                    <input
                      required value={name} onChange={(e) => setName(e.target.value)}
                      placeholder="Enter Your Name"
                      className="w-full rounded-xl border-2 border-brand-ink/20 bg-card px-4 py-3 text-sm font-medium outline-none focus:border-brand-coral"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-bold">Email</span>
                    <input
                      type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Your Email"
                      className="w-full rounded-xl border-2 border-brand-ink/20 bg-card px-4 py-3 text-sm font-medium outline-none focus:border-brand-coral"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-bold">Password</span>
                    <div className="relative">
                      <input
                        type={show ? "text" : "password"} required minLength={4}
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Your Password"
                        className="w-full rounded-xl border-2 border-brand-ink/20 bg-card px-4 py-3 pr-11 text-sm font-medium outline-none focus:border-brand-coral"
                      />
                      <button type="button" onClick={() => setShow((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-foreground/60 hover:text-foreground">
                        {show ? "Hide" : "Show"}
                      </button>
                    </div>
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-sm font-bold">Confirm Password</span>
                    <input
                      type={show ? "text" : "password"} required minLength={4}
                      value={confirm} onChange={(e) => setConfirm(e.target.value)}
                      placeholder="Re-enter Your Password"
                      className="w-full rounded-xl border-2 border-brand-ink/20 bg-card px-4 py-3 text-sm font-medium outline-none focus:border-brand-coral"
                    />
                  </label>

                  {err ? (
                    <div className="rounded-lg brutal-border bg-brand-coral/25 px-3 py-2 text-sm font-semibold">{err}</div>
                  ) : null}

                  <button
                    type="submit" disabled={busy}
                    className="w-full rounded-xl brutal-border brutal-shadow bg-brand-coral px-6 py-3 text-base font-bold transition-transform hover:-translate-y-0.5 active:translate-x-0.5 active:translate-y-0.5 active:shadow-none disabled:opacity-70"
                  >
                    {busy ? "Creating…" : "Sign Up"}
                  </button>

                  <div className="flex items-center gap-3 py-1">
                    <span className="h-px flex-1 bg-brand-ink/20" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-foreground/60">Or</span>
                    <span className="h-px flex-1 bg-brand-ink/20" />
                  </div>
                  <div className="flex justify-center gap-3">
                    {["F", "G", "X"].map((l) => (
                      <button type="button" key={l} className="grid h-11 w-11 place-items-center rounded-full brutal-border brutal-shadow-sm bg-card font-display text-sm transition-transform hover:-translate-y-0.5">
                        {l}
                      </button>
                    ))}
                  </div>

                  <p className="pt-2 text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="font-bold text-brand-coral hover:underline">Log In</Link>
                  </p>
                </form>
              </div>

              <div className="relative hidden overflow-hidden bg-[color-mix(in_oklab,var(--brand-pink)_55%,white)] md:block">
                <div className="relative flex h-full items-center justify-center p-8">
                  <DecayCard
                    width={320}
                    height={420}
                    image="https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=800&q=80"
                  >
                    <h2 style={{ margin: 0, lineHeight: 0.95 }}>
                      Turn It<br />Into Gold.
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