import mandala from "@/assets/mandala-bg.jpg";

// Full-bleed living background: drifting mandala + slow colour blobs.
export default function LiveBackground() {
  return (
    <div className="live-bg" aria-hidden>
      {/* Mandala layer — larger tile so viewers see the cutting edge of the artwork */}
      <div
        className="absolute inset-[-25%] opacity-[0.26] mix-blend-multiply"
        style={{
          backgroundImage: `url(${mandala})`,
          backgroundSize: "1400px 1400px",
          backgroundRepeat: "repeat",
          animation: "mandala-drift 110s linear infinite",
        }}
      />
      {/* Second, much larger parallax pass — deliberately clips off-screen */}
      <div
        className="absolute inset-[-15%] opacity-[0.14]"
        style={{
          backgroundImage: `url(${mandala})`,
          backgroundSize: "2000px 2000px",
          backgroundRepeat: "repeat",
          animation: "mandala-drift 180s linear reverse infinite",
        }}
      />
      {/* Drifting colour blobs */}
      <div
        className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full opacity-70 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--brand-mint), transparent 65%)",
          animation: "blob-float-a 18s ease-in-out infinite",
        }}
      />
      <div
        className="absolute top-1/3 -right-40 h-[600px] w-[600px] rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--brand-coral), transparent 65%)",
          animation: "blob-float-b 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-0 left-1/3 h-[500px] w-[500px] rounded-full opacity-55 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--brand-mustard), transparent 65%)",
          animation: "blob-float-a 26s ease-in-out infinite",
        }}
      />
      {/* Subtle paper grain to keep the neo-brutalism warmth */}
      <div
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='120' height='120'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
        }}
      />
    </div>
  );
}