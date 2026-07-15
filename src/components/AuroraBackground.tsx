// Aurora / mesh-gradient live wallpaper for auth pages.
// Different pattern from the home LiveBackground (no mandala, drifting blurred blobs only).
export default function AuroraBackground() {
  return (
    <div className="aurora-bg" aria-hidden>
      <div className="aurora-blob aurora-a" />
      <div className="aurora-blob aurora-b" />
      <div className="aurora-blob aurora-c" />
      <div className="aurora-blob aurora-d" />
      <div className="aurora-grain" />
      {Array.from({ length: 14 }).map((_, i) => (
        <span key={i} className="aurora-dot" style={{
          left: `${(i * 7 + 5) % 100}%`,
          animationDelay: `${(i * 0.9).toFixed(2)}s`,
          animationDuration: `${12 + (i % 5) * 3}s`,
        }} />
      ))}
    </div>
  );
}