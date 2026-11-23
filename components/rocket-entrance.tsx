"use client";

import { useEffect, useState, type CSSProperties } from "react";

export default function RocketEntrance() {
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    if (finished) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const dismiss = () => setFinished(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Tab") dismiss();
    };
    const onMotionChange = () => {
      if (motion.matches) dismiss();
    };
    const previousOverflow = document.body.style.overflow;
    if (!motion.matches) document.body.style.overflow = "hidden";

    // Also dismiss if animation events are disabled or interrupted.
    const timeout = window.setTimeout(dismiss, motion.matches ? 0 : 5600);
    document.addEventListener("keydown", onKeyDown);
    motion.addEventListener("change", onMotionChange);
    return () => {
      window.clearTimeout(timeout);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      motion.removeEventListener("change", onMotionChange);
    };
  }, [finished]);

  if (finished) return null;

  return (
    <div
      className="rocket-entrance"
      onAnimationEnd={(event) => {
        if (event.target === event.currentTarget) setFinished(true);
      }}
    >
      <div className="rocket-scene" aria-hidden="true">
        {Array.from({ length: 36 }, (_, index) => (
          <span
            key={index}
            className="rocket-streak"
            style={
              {
                "--streak-x": `${(index * 37 + 11) % 100}%`,
                "--streak-length": `${35 + (index * 19) % 110}px`,
                "--streak-duration": `${550 + (index * 83) % 850}ms`,
                "--streak-delay": `${-(index * 137) % 1600}ms`,
              } as CSSProperties
            }
          />
        ))}
        {[8, 24, 74, 91, 15, 83, 31, 66].map((x, index) => (
          <span
            key={x}
            className="rocket-asteroid"
            style={
              {
                "--asteroid-x": `${x}%`,
                "--asteroid-size": `${30 + (index * 17) % 55}px`,
                "--asteroid-duration": `${2200 + (index * 149) % 1000}ms`,
                "--asteroid-delay": `${-(index * 503) % 2600}ms`,
                "--asteroid-drift": x < 50 ? "-35px" : "35px",
              } as CSSProperties
            }
          />
        ))}
        <div className="rocket-vehicle">
          <div className="rocket-exhaust" />
          <svg className="rocket-icon" viewBox="0 0 100 140" fill="none">
            <path d="M31 78C16 84 12 108 16 124L34 110Z" fill="#c4cbdf" />
            <path d="M69 78C84 84 88 108 84 124L66 110Z" fill="#c4cbdf" />
            <path d="M39 116H61L64 134H36Z" fill="#747f9c" />
            <path d="M50 5C25 27 24 67 29 95L36 119H64L71 95C76 67 75 27 50 5Z" fill="#f6f7fc" />
            <path d="M35 26H65M28 98H72" stroke="#a8b1c9" strokeWidth="3" />
            <circle cx="50" cy="63" r="17" fill="#35415d" />
            <circle cx="50" cy="63" r="11" fill="#9cecff" />
            <path d="M45 60L51 55" stroke="#f6f7fc" strokeWidth="3" strokeLinecap="round" />
            <path d="M50 99V123" stroke="#a8b1c9" strokeWidth="4" strokeLinecap="round" />
          </svg>
        </div>
        <p className="rocket-caption">Launching portfolio<span>Domingo.</span></p>
      </div>
    </div>
  );
}
