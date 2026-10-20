import type { CSSProperties } from "react";

/** Decorative light that follows its parent's rounded outline. */
export default function BorderStar() {
  return (
    <span className="border-star" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span
          key={index}
          className="border-star-point border-star-dust"
          style={
            {
              "--trail-delay": `${(index + 1) * 0.035}s`,
              opacity: 0.65 * (1 - index / 12),
            } as CSSProperties
          }
        />
      ))}
      <span className="border-star-point border-star-head" />
    </span>
  );
}
