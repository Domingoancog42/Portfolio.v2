import type { CSSProperties } from "react";

const stars = [
  { x: "-12%", y: "4%", delay: "-2s", duration: "12s" },
  { x: "18%", y: "-12%", delay: "-7s", duration: "15s" },
  { x: "52%", y: "-8%", delay: "-11s", duration: "18s" },
  { x: "-18%", y: "35%", delay: "-5s", duration: "16s" },
  { x: "36%", y: "8%", delay: "-14s", duration: "20s" },
  { x: "-8%", y: "60%", delay: "-9s", duration: "19s" },
];

export default function ShootingStars() {
  return (
    <div className="shooting-stars" aria-hidden="true">
      {stars.map((star, index) => (
        <span
          key={index}
          className="shooting-star"
          style={
            {
              "--star-x": star.x,
              "--star-y": star.y,
              "--shoot-delay": star.delay,
              "--shoot-duration": star.duration,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
