type ColumnProps = {
  className?: string;
  /** Number of grip rings crimped into the rod. */
  flutes?: number;
};

/**
 * Replaces the old fluted Doric column. Same job — a tall, thin vertical
 * mark, drawn as vector so it composites cleanly at any size, tint or
 * opacity and can actually *hold* things rather than just decorate a
 * margin — but drawn from the shop's own tools instead of a temple: a
 * spit rod, with a handle loop at the top, a run of crimped grip rings
 * down the shaft, and a skewer point at the base.
 *
 * The prop is still called `flutes` so nothing calling this needs to
 * change — it now sets the number of grip rings instead.
 *
 * Colour comes from `currentColor`, so a parent can tint it.
 */
export default function Column({ className = "", flutes = 7 }: ColumnProps) {
  const shaftTop = 62;
  const shaftBottom = 358;
  const shaftLeft = 33;
  const shaftRight = 47;
  const shaftWidth = shaftRight - shaftLeft;
  const cx = (shaftLeft + shaftRight) / 2;

  return (
    <svg
      viewBox="0 0 80 400"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      fill="none"
    >
      <defs>
        {/* Cylindrical shading: light from upper-left, same lighting logic
            as before, now on a slim steel rod rather than a stone shaft. */}
        <linearGradient id="col-shaft" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.10" />
          <stop offset="30%" stopColor="currentColor" stopOpacity="0.02" />
          <stop offset="60%" stopColor="currentColor" stopOpacity="0.16" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.34" />
        </linearGradient>
        <linearGradient id="col-slab" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.08" />
          <stop offset="45%" stopColor="currentColor" stopOpacity="0.03" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.28" />
        </linearGradient>
      </defs>

      {/* ---- Handle loop ---- */}
      <rect x="26" y="8" width="28" height="9" rx="4.5" fill="url(#col-slab)" />
      <path
        d="M32 17c0 10 16 10 16 0"
        stroke="currentColor"
        strokeOpacity="0.22"
        strokeWidth="3"
      />
      {/* Collar where the loop meets the rod */}
      <rect x="30" y="44" width="20" height="6" rx="1.5" fill="url(#col-slab)" />
      <rect x="30" y="44" width="20" height="1.6" fill="currentColor" opacity="0.14" />

      {/* ---- Shaft ---- */}
      <rect
        x={shaftLeft}
        y={shaftTop}
        width={shaftWidth}
        height={shaftBottom - shaftTop}
        fill="url(#col-shaft)"
      />
      {/* Rod edge highlight, catching the light along one side */}
      <line
        x1={shaftLeft + 1.4}
        y1={shaftTop + 2}
        x2={shaftLeft + 1.4}
        y2={shaftBottom - 10}
        stroke="#fff"
        strokeOpacity="0.28"
        strokeWidth="0.9"
      />

      {/* Crimped grip rings, evenly spaced down the rod */}
      {Array.from({ length: flutes }).map((_, i) => {
        const y = shaftTop + ((i + 1) * (shaftBottom - shaftTop - 14)) / (flutes + 1);
        return (
          <g key={i}>
            <rect
              x={shaftLeft - 2}
              y={y}
              width={shaftWidth + 4}
              height="3.4"
              rx="1"
              fill="currentColor"
              opacity="0.16"
            />
            <rect
              x={shaftLeft - 2}
              y={y}
              width={shaftWidth + 4}
              height="1"
              fill="#fff"
              opacity="0.26"
            />
          </g>
        );
      })}

      {/* ---- Skewer point ---- */}
      <path d={`M${shaftLeft} ${shaftBottom}h${shaftWidth}l-${shaftWidth / 2} 26z`} fill="url(#col-slab)" />
      <line
        x1={cx - 0.6}
        y1={shaftBottom + 2}
        x2={cx - 0.6}
        y2={shaftBottom + 20}
        stroke="#fff"
        strokeOpacity="0.22"
        strokeWidth="0.8"
      />

      {/* ---- Foot / stand the rod rests in ---- */}
      <rect x="6" y="386" width="68" height="8" rx="1" fill="url(#col-slab)" />
      <rect x="6" y="386" width="68" height="2" fill="#fff" opacity="0.2" />
    </svg>
  );
}
