"use client";

import { useEffect, useRef } from "react";

export default function ScrollbarAnimation() {
  const track = useRef<HTMLDivElement>(null);
  const thumb = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const rail = track.current;
    const handle = thumb.current;
    if (!rail || !handle) return;
    const root = document.documentElement;
    let idle: ReturnType<typeof setTimeout>;
    let dragging = false;
    let grabOffset = 0;
    let handleHeight = 48;
    const update = () => {
      const height = window.innerHeight;
      const total = root.scrollHeight;
      handleHeight = Math.min(height, Math.max(48, height * height / total));
      const range = total - height;
      rail.hidden = range <= 0;
      handle.style.height = `${handleHeight}px`;
      handle.style.transform = `translateY(${range > 0 ? Math.max(0, Math.min(1, window.scrollY / range)) * (height - handleHeight) : 0}px)`;
    };
    const onScroll = () => {
      update();
      rail.classList.add("is-scrolling");
      clearTimeout(idle);
      idle = setTimeout(() => rail.classList.remove("is-scrolling"), 650);
    };
    const move = (event: PointerEvent) => {
      if (!dragging) return;
      const travel = window.innerHeight - handleHeight;
      const progress = travel > 0 ? Math.max(0, Math.min(1, (event.clientY - grabOffset) / travel)) : 0;
      window.scrollTo({ top: progress * (root.scrollHeight - window.innerHeight), behavior: "instant" });
    };
    const down = (event: PointerEvent) => {
      if (event.button !== 0) return;
      event.preventDefault();
      dragging = true;
      grabOffset = handle.contains(event.target as Node) ? event.clientY - handle.getBoundingClientRect().top : handleHeight / 2;
      rail.setPointerCapture(event.pointerId);
      rail.classList.add("is-dragging");
      move(event);
    };
    const up = () => {
      dragging = false;
      rail.classList.remove("is-dragging");
    };
    root.classList.add("custom-scrollbar-ready");
    update();
    const observer = new ResizeObserver(update);
    observer.observe(document.body);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    rail.addEventListener("pointerdown", down);
    rail.addEventListener("pointermove", move);
    rail.addEventListener("pointerup", up);
    rail.addEventListener("pointercancel", up);
    rail.addEventListener("lostpointercapture", up);
    return () => {
      clearTimeout(idle);
      observer.disconnect();
      root.classList.remove("custom-scrollbar-ready");
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      rail.removeEventListener("pointerdown", down);
      rail.removeEventListener("pointermove", move);
      rail.removeEventListener("pointerup", up);
      rail.removeEventListener("pointercancel", up);
      rail.removeEventListener("lostpointercapture", up);
    };
  }, []);
  return (
    <div ref={track} className="animated-scrollbar" aria-hidden="true">
      <div ref={thumb} className="animated-scrollbar-thumb">
        <span className="scrollbar-electricity" />
      </div>
    </div>
  );
}
