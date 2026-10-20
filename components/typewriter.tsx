"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const roles = ["UI/UX Designer", "Web Developer", "Game Developer"];

function subscribeMotion(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export default function Typewriter() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [length, setLength] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const reducedMotion = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => true,
  );

  useEffect(() => {
    if (reducedMotion) return;
    const role = roles[roleIndex];
    const complete = length === role.length;
    const timeout = window.setTimeout(
      () => {
        if (!deleting && complete) setDeleting(true);
        else if (deleting && length === 0) {
          setDeleting(false);
          setRoleIndex((index) => (index + 1) % roles.length);
        } else setLength((value) => value + (deleting ? -1 : 1));
      },
      !deleting && complete ? 1800 : deleting ? (length === 0 ? 350 : 45) : 95,
    );
    return () => window.clearTimeout(timeout);
  }, [roleIndex, length, deleting, reducedMotion]);

  return (
    <p className="hero-role hero-typewriter">
      <span className="sr-only">
        Specialized in UI/UX design, web development, and game development.
      </span>
      <span aria-hidden="true">
        <span className="typewriter-prefix">Specialized in </span>
        <span className="typewriter-word">
          {reducedMotion ? roles[0] : roles[roleIndex].slice(0, length)}
          <span className="typewriter-cursor">|</span>
        </span>
      </span>
    </p>
  );
}
