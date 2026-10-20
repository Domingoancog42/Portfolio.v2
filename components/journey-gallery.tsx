"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { flushSync } from "react-dom";
import { journeyMoments } from "@/lib/gallery";

function restingTransform(depth: number) {
  depth = Math.min(depth, 3);
  return `translate3d(0, ${depth * 12}px, 0) rotate(${depth === 0 ? -2 : depth % 2 ? 4 : -6}deg) scale(${1 - depth * 0.045})`;
}

export default function JourneyGallery() {
  const [order, setOrder] = useState(() =>
    journeyMoments.map((_, index) => index),
  );
  const [busy, setBusy] = useState(false);
  const cards = useRef<(HTMLButtonElement | null)[]>([]);
  const locked = useRef(false);
  const ignoreClick = useRef(false);
  const gesture = useRef<{
    x: number;
    y: number;
    dx: number;
    dy: number;
    lastX: number;
    time: number;
    velocity: number;
  } | null>(null);
  const alive = useRef(true);
  const current = journeyMoments[order[0]];

  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
      cards.current.forEach((card) =>
        card?.getAnimations().forEach((animation) => animation.cancel()),
      );
    };
  }, []);

  async function advance(direction = 1, dx = 0, dy = 0) {
    if (locked.current || order.length < 2) return;
    const index = order[0];
    const card = cards.current[index];
    if (!card) return;
    locked.current = true;
    setBusy(true);
    card.classList.remove("is-dragging");
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    try {
      const departure = `translate3d(${direction * (card.offsetWidth + 90)}px, ${dy - 45}px, 0) rotate(${direction * 22}deg) scale(.95)`;
      if (!reduced) {
        const flight = card.animate(
          [
            {
              transform: dx
                ? `translate3d(${dx}px, ${dy}px, 0) rotate(${dx / 22}deg)`
                : restingTransform(0),
            },
            { transform: departure },
          ],
          {
            duration: 260,
            easing: "cubic-bezier(.3,.05,.7,.4)",
            fill: "forwards",
          },
        );
        await flight.finished;
        if (!alive.current) return;
        card.style.removeProperty("transform");
        flushSync(() =>
          setOrder((previous) => [...previous.slice(1), previous[0]]),
        );
        if (document.activeElement === card)
          cards.current[order[1]]?.focus({ preventScroll: true });
        const tuck = card.animate(
          [
            { transform: departure },
            { transform: restingTransform(order.length - 1) },
          ],
          {
            duration: 380,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "forwards",
          },
        );
        flight.cancel();
        await tuck.finished;
        tuck.cancel();
      } else {
        card.style.removeProperty("transform");
        flushSync(() =>
          setOrder((previous) => [...previous.slice(1), previous[0]]),
        );
        if (document.activeElement === card)
          cards.current[order[1]]?.focus({ preventScroll: true });
      }
    } catch {
      /* An unmount cancels the decorative motion. */
    } finally {
      if (alive.current) {
        locked.current = false;
        setBusy(false);
      }
    }
  }

  function begin(event: PointerEvent<HTMLButtonElement>) {
    if (locked.current || event.button !== 0) return;
    ignoreClick.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
    event.currentTarget.classList.add("is-dragging");
    gesture.current = {
      x: event.clientX,
      y: event.clientY,
      dx: 0,
      dy: 0,
      lastX: event.clientX,
      time: performance.now(),
      velocity: 0,
    };
  }
  function move(event: PointerEvent<HTMLButtonElement>) {
    const drag = gesture.current;
    if (!drag || locked.current) return;
    const now = performance.now();
    drag.velocity = (event.clientX - drag.lastX) / Math.max(now - drag.time, 1);
    drag.lastX = event.clientX;
    drag.time = now;
    drag.dx = event.clientX - drag.x;
    drag.dy = (event.clientY - drag.y) * 0.35;
    event.currentTarget.style.transform = `translate3d(${drag.dx}px, ${drag.dy}px, 0) rotate(${drag.dx / 22}deg)`;
  }
  function release(event: PointerEvent<HTMLButtonElement>, cancelled = false) {
    const drag = gesture.current;
    gesture.current = null;
    event.currentTarget.classList.remove("is-dragging");
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    if (!drag) return;
    ignoreClick.current = Math.abs(drag.dx) > 5 || Math.abs(drag.dy) > 5;
    const quickFlick =
      performance.now() - drag.time < 100 &&
      Math.abs(drag.velocity) > 0.45 &&
      Math.abs(drag.dx) > 12;
    if (
      !cancelled &&
      (Math.abs(drag.dx) > event.currentTarget.offsetWidth * 0.18 || quickFlick)
    ) {
      void advance(Math.sign(drag.dx) || 1, drag.dx, drag.dy);
    } else event.currentTarget.style.transform = restingTransform(0);
  }

  return (
    <section
      id="gallery"
      className="section container journey-section"
      aria-labelledby="journey-heading"
    >
      <header className="journey-heading">
        <p>MY JOURNEY</p>
        <h2 id="journey-heading">Moments along the way.</h2>
        <span>
          A glimpse of the learning, projects, and milestones that shape my
          journey.
        </span>
      </header>
      <div className="journey-stack-viewport">
        <div
          className="journey-stack"
          role="group"
          aria-label="Journey photo card stack"
        >
          {order.map((index, depth) => {
            const item = journeyMoments[index];
            return (
              <button
                key={item.id}
                ref={(element) => {
                  cards.current[index] = element;
                }}
                type="button"
                className="journey-stack-card"
                style={{
                  zIndex: order.length - depth,
                  transform: restingTransform(depth),
                }}
                tabIndex={depth === 0 ? 0 : -1}
                aria-hidden={depth !== 0}
                aria-label={`${item.title}. Drag or click to see the next image.`}
                aria-disabled={busy}
                onPointerDown={depth === 0 ? begin : undefined}
                onPointerMove={depth === 0 ? move : undefined}
                onPointerUp={
                  depth === 0 ? (event) => release(event) : undefined
                }
                onPointerCancel={
                  depth === 0 ? (event) => release(event, true) : undefined
                }
                onClick={() => {
                  if (ignoreClick.current) {
                    ignoreClick.current = false;
                    return;
                  }
                  if (depth === 0) void advance();
                }}
                onKeyDown={(event) => {
                  if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
                    event.preventDefault();
                    void advance(event.key === "ArrowLeft" ? -1 : 1);
                  }
                }}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  width={1200}
                  height={800}
                  draggable={false}
                  sizes="(max-width: 620px) 85vw, 600px"
                />
                <span className="journey-stack-caption">
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                </span>
              </button>
            );
          })}
        </div>
      </div>
      <div className="journey-stack-info" role="status" aria-live="polite">
        <span>
          {String(order[0] + 1).padStart(2, "0")} /{" "}
          {String(order.length).padStart(2, "0")}
        </span>
        <p>{current?.caption}</p>
      </div>
      <p className="journey-stack-hint">
        Drag, flick, or click the top card to explore.
      </p>
    </section>
  );
}
