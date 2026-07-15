import { useRef, useCallback, useEffect, type ReactNode, type CSSProperties } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  edgeSensitivity?: number;
  glowColor?: string; // "H S L"
  backgroundColor?: string;
  borderRadius?: number;
  glowRadius?: number;
  glowIntensity?: number;
  coneSpread?: number;
  animated?: boolean;
  colors?: [string, string, string];
  fillOpacity?: number;
};

function parseHSL(s: string) {
  const m = s.match(/([\d.]+)\s*([\d.]+)%?\s*([\d.]+)%?/);
  if (!m) return { h: 40, s: 80, l: 80 };
  return { h: +m[1], s: +m[2], l: +m[3] };
}

function glowVars(color: string, intensity: number): CSSProperties {
  const { h, s, l } = parseHSL(color);
  const base = `${h}deg ${s}% ${l}%`;
  const ops = [100, 60, 50, 40, 30, 20, 10];
  const keys = ["", "-60", "-50", "-40", "-30", "-20", "-10"];
  const v: Record<string, string> = {};
  ops.forEach((o, i) => {
    v[`--glow-color${keys[i]}`] = `hsl(${base} / ${Math.min(o * intensity, 100)}%)`;
  });
  return v as CSSProperties;
}

const GRAD_POS = ["80% 55%", "69% 34%", "8% 6%", "41% 38%", "86% 85%", "82% 18%", "51% 4%"];
const GRAD_KEYS = [
  "--gradient-one", "--gradient-two", "--gradient-three", "--gradient-four",
  "--gradient-five", "--gradient-six", "--gradient-seven",
];
const COLOR_MAP = [0, 1, 2, 0, 1, 2, 1];

function gradVars(colors: [string, string, string]): CSSProperties {
  const v: Record<string, string> = {};
  for (let i = 0; i < 7; i++) {
    const c = colors[COLOR_MAP[i]];
    v[GRAD_KEYS[i]] = `radial-gradient(at ${GRAD_POS[i]}, ${c} 0px, transparent 50%)`;
  }
  v["--gradient-base"] = `linear-gradient(${colors[0]} 0 100%)`;
  return v as CSSProperties;
}

export default function BorderGlow({
  children,
  className = "",
  edgeSensitivity = 30,
  glowColor = "40 80 80",
  backgroundColor = "#F5EFE0",
  borderRadius = 28,
  glowRadius = 40,
  glowIntensity = 1,
  coneSpread = 25,
  animated = false,
  colors = ["#E8815A", "#87A878", "#F5EFE0"],
  fillOpacity = 0.5,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card) return;
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const cx = r.width / 2;
    const cy = r.height / 2;
    const dx = x - cx;
    const dy = y - cy;
    let kx = Infinity, ky = Infinity;
    if (dx !== 0) kx = cx / Math.abs(dx);
    if (dy !== 0) ky = cy / Math.abs(dy);
    const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);
    const rad = Math.atan2(dy, dx);
    let deg = rad * (180 / Math.PI) + 90;
    if (deg < 0) deg += 360;
    card.style.setProperty("--edge-proximity", `${(edge * 100).toFixed(2)}`);
    card.style.setProperty("--cursor-angle", `${deg.toFixed(2)}deg`);
  }, []);

  useEffect(() => {
    if (!animated || !ref.current) return;
    const card = ref.current;
    card.classList.add("sweep-active");
    let start: number | null = null;
    let raf = 0;
    const dur = 2200;
    const tick = (t: number) => {
      if (start == null) start = t;
      const p = Math.min((t - start) / dur, 1);
      card.style.setProperty("--edge-proximity", `${(100 * (1 - Math.abs(p - 0.5) * 2)).toFixed(2)}`);
      card.style.setProperty("--cursor-angle", `${110 + 355 * p}deg`);
      if (p < 1) raf = requestAnimationFrame(tick);
      else card.classList.remove("sweep-active");
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [animated]);

  const style = {
    "--card-bg": backgroundColor,
    "--edge-sensitivity": edgeSensitivity,
    "--border-radius": `${borderRadius}px`,
    "--glow-padding": `${glowRadius}px`,
    "--cone-spread": coneSpread,
    "--fill-opacity": fillOpacity,
    ...glowVars(glowColor, glowIntensity),
    ...gradVars(colors),
  } as CSSProperties;

  return (
    <div ref={ref} onPointerMove={handleMove} className={`border-glow-card ${className}`} style={style}>
      <span className="edge-light" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}