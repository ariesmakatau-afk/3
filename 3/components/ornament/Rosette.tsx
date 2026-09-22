type RosetteProps = {
  className?: string;
};

/**
 * Replaces the old carved-marble rosette. Same job — a large, very quiet
 * mark that sits behind a hero or a photo grid at 4–8% opacity — but
 * drawn from the shop's own fire instead of a plaster ceiling medallion:
 * a ring of coals with flame tongues licking up from the rim toward a
 * glowing centre. Vector, so it composites cleanly at any size or tint.
 * Inherits `currentColor`.
 */
export default function Rosette({ className = "" }: RosetteProps) {
  const coals = 26; // the ember ring, standing in for the old dentil ring
  const flames = 14; // rising flame tongues, standing in for the sunburst

  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className={className} fill="none">
      {/* Outer rings — the rim of the grill / spit wheel */}
      <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="2.5" opacity="0.5" />
      <circle cx="100" cy="100" r="88" stroke="currentColor" strokeWidth="1.2" opacity="0.35" />
      <circle cx="100" cy="100" r="78" stroke="currentColor" strokeWidth="3" opacity="0.45" />

      {/* Ring of coals */}
      <g opacity="0.6">
        {Array.from({ length: coals }).map((_, i) => {
          const a = (i / coals) * Math.PI * 2;
          const r = 70;
          const cx = 100 + Math.cos(a) * r;
          const cy = 100 + Math.sin(a) * r;
          const size = i % 3 === 0 ? 3.4 : 2.2;
          return <circle key={i} cx={cx} cy={cy} r={size} fill="currentColor" />;
        })}
      </g>

      <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
      <circle cx="100" cy="100" r="44" stroke="currentColor" strokeWidth="2" opacity="0.4" />

      {/* Rising flame tongues, licking inward from the inner ring */}
      <g opacity="0.55">
        {Array.from({ length: flames }).map((_, i) => {
          const a = (i / flames) * Math.PI * 2;
          const inner = 15;
          const outer = 41;
          const sway = ((i % 2) - 0.5) * 0.18;
          const baseA = a - Math.PI / flames / 1.6;
          const baseB = a + Math.PI / flames / 1.6;
          const tipX = 100 + Math.cos(a + sway) * outer;
          const tipY = 100 + Math.sin(a + sway) * outer;
          const midX = 100 + Math.cos(a) * (outer - 9);
          const midY = 100 + Math.sin(a) * (outer - 9);
          const aX = 100 + Math.cos(baseA) * inner;
          const aY = 100 + Math.sin(baseA) * inner;
          const bX = 100 + Math.cos(baseB) * inner;
          const bY = 100 + Math.sin(baseB) * inner;
          return (
            <path
              key={i}
              d={`M${aX} ${aY}Q${midX} ${midY} ${tipX} ${tipY}Q${midX} ${midY} ${bX} ${bY}`}
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
            />
          );
        })}
      </g>

      {/* Glowing coal at the centre */}
      <circle cx="100" cy="100" r="13" stroke="currentColor" strokeWidth="2.2" opacity="0.5" />
      <circle cx="100" cy="100" r="5" fill="currentColor" opacity="0.32" />
    </svg>
  );
}
