"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from "react";

const roles = ["UI/UX Designer", "Web Developer", "Game Developer"];

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export default function SpecialtyFlicker() {
  const [roleIndex, setRoleIndex] = useState(0);
  const element = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );

  useEffect(() => {
    if (reducedMotion || !element.current) return;
    let inView = false;
    let interval: number | undefined;
    const syncPlayback = () => {
      window.clearInterval(interval);
      if (inView && !document.hidden) {
        interval = window.setInterval(() => {
          setRoleIndex((index) => (index + 1) % roles.length);
        }, 3600);
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      syncPlayback();
    });
    observer.observe(element.current);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      window.clearInterval(interval);
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, [reducedMotion]);

  return (
    <p ref={element} className="hero-role hero-specialty">
      <span className="sr-only">
        Specialized in UI/UX design, web development, and game development.
      </span>
      <span aria-hidden="true">
        <span className="specialty-prefix">Specialized in </span>
        <span className="specialty-word">
          <span key={reducedMotion ? 0 : roleIndex} className="specialty-letters">
            {roles[reducedMotion ? 0 : roleIndex].split("").map((letter, index) => (
              <span
                key={index}
                className="specialty-letter"
                style={{ "--flicker-delay": `${(index * 73) % 280}ms` } as CSSProperties}
              >
                {letter}
              </span>
            ))}
          </span>
        </span>
      </span>
    </p>
  );
}
