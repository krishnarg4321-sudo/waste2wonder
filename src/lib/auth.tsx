import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type W2WUser = {
  id: string;
  name: string;
  email: string;
  avatarSeed: string;
  bio: string;
  joinedAt: string;
  stats: { projects: number; wasteKg: number; votes: number };
};

type AuthState = {
  user: W2WUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const KEY = "w2w.session.v1";
const USERS = "w2w.users.v1";

const AuthCtx = createContext<AuthState | null>(null);

type StoredUser = W2WUser & { password: string };

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(USERS) ?? "[]"); } catch { return []; }
}
function writeUsers(u: StoredUser[]) { localStorage.setItem(USERS, JSON.stringify(u)); }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<W2WUser | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch { /* ignore */ }
  }, []);

  const persist = (u: W2WUser | null) => {
    if (u) localStorage.setItem(KEY, JSON.stringify(u));
    else localStorage.removeItem(KEY);
    setUser(u);
  };

  const signup = useCallback(async (name: string, email: string, password: string) => {
    const users = readUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      throw new Error("An account with that email already exists.");
    }
    const created: StoredUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      avatarSeed: name.trim().split(" ")[0] || "maker",
      bio: "New Waste2Wonder maker just getting started.",
      joinedAt: new Date().toISOString(),
      stats: { projects: 0, wasteKg: 0, votes: 0 },
      password,
    };
    writeUsers([...users, created]);
    const { password: _p, ...safe } = created;
    persist(safe);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const users = readUsers();
    const match = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (!match) throw new Error("Invalid email or password.");
    const { password: _p, ...safe } = match;
    persist(safe);
  }, []);

  const logout = useCallback(() => persist(null), []);

  const value = useMemo(() => ({ user, login, signup, logout }), [user, login, signup, logout]);
  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}