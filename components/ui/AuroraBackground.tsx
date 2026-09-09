/**
 * Fixed, full-viewport animated backdrop: soft drifting "aurora" blobs behind a
 * faint dotted grid. Purely decorative, sits behind all content (-z-10).
 */
export function AuroraBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* dotted grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* aurora blobs */}
      <div className="animate-aurora absolute -top-40 -left-40 h-[42rem] w-[42rem] rounded-full bg-accent-1/20 blur-[120px]" />
      <div
        className="animate-aurora absolute top-1/3 -right-40 h-[38rem] w-[38rem] rounded-full bg-accent-3/15 blur-[120px]"
        style={{ animationDelay: "-7s" }}
      />
      <div
        className="animate-aurora absolute bottom-0 left-1/4 h-[34rem] w-[34rem] rounded-full bg-accent-4/15 blur-[120px]"
        style={{ animationDelay: "-14s" }}
      />

      {/* vignette so text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    </div>
  );
}
