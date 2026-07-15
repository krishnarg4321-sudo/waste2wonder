import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "gsap";

type Props = {
  width?: number;
  height?: number;
  image: string;
  baseFrequency?: number;
  numOctaves?: number;
  seed?: number;
  maxDisplacement?: number;
  movementBound?: number;
  children?: ReactNode;
};

export default function DecayCard({
  width = 300,
  height = 400,
  image,
  baseFrequency = 0.015,
  numOctaves = 5,
  seed = 4,
  maxDisplacement = 400,
  movementBound = 50,
  children,
}: Props) {
  const svgRef = useRef<HTMLDivElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const cached = { ...cursor };
    const winsize = { width: window.innerWidth, height: window.innerHeight };
    const state = { x: 0, y: 0, rz: 0, disp: 0 };

    const lerp = (a: number, b: number, n: number) => (1 - n) * a + n * b;
    const map = (x: number, a: number, b: number, c: number, d: number) => ((x - a) * (d - c)) / (b - a) + c;
    const dist = (x1: number, x2: number, y1: number, y2: number) => Math.hypot(x1 - x2, y1 - y2);

    const onResize = () => { winsize.width = window.innerWidth; winsize.height = window.innerHeight; };
    const onMove = (e: MouseEvent) => { cursor.x = e.clientX; cursor.y = e.clientY; };
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMove);

    let raf = 0;
    const render = () => {
      let tx = lerp(state.x, map(cursor.x, 0, winsize.width, -120, 120), 0.1);
      let ty = lerp(state.y, map(cursor.y, 0, winsize.height, -120, 120), 0.1);
      const trz = lerp(state.rz, map(cursor.x, 0, winsize.width, -10, 10), 0.1);
      if (tx > movementBound) tx = movementBound + (tx - movementBound) * 0.2;
      if (tx < -movementBound) tx = -movementBound + (tx + movementBound) * 0.2;
      if (ty > movementBound) ty = movementBound + (ty - movementBound) * 0.2;
      if (ty < -movementBound) ty = -movementBound + (ty + movementBound) * 0.2;
      state.x = tx; state.y = ty; state.rz = trz;
      if (svgRef.current) gsap.set(svgRef.current, { x: tx, y: ty, rotateZ: trz });
      const d = dist(cached.x, cursor.x, cached.y, cursor.y);
      state.disp = lerp(state.disp, map(d, 0, 200, 0, maxDisplacement), 0.06);
      if (dispRef.current) gsap.set(dispRef.current, { attr: { scale: state.disp } });
      cached.x = cursor.x; cached.y = cursor.y;
      raf = requestAnimationFrame(render);
    };
    raf = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [maxDisplacement, movementBound]);

  return (
    <div className="decay-card" style={{ width, height }} ref={svgRef}>
      <svg viewBox="-60 -75 720 900" preserveAspectRatio="xMidYMid slice" className="decay-svg">
        <filter id="decayFilter">
          <feTurbulence
            type="turbulence" baseFrequency={baseFrequency} numOctaves={numOctaves}
            seed={seed} stitchTiles="stitch" x="0%" y="0%" width="100%" height="100%"
            result="turbulence1"
          />
          <feDisplacementMap
            ref={dispRef} in="SourceGraphic" in2="turbulence1" scale={0}
            xChannelSelector="R" yChannelSelector="B"
            x="0%" y="0%" width="100%" height="100%" result="displacementMap3"
          />
        </filter>
        <g>
          <image href={image} x="0" y="0" width="600" height="750" filter="url(#decayFilter)" preserveAspectRatio="xMidYMid slice" />
        </g>
      </svg>
      {children ? <div className="decay-card-text">{children}</div> : null}
    </div>
  );
}