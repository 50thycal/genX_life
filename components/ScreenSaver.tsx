"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/** Idle time before it kicks in. Long enough to read a page without tripping it. */
const IDLE_MS = 90_000;
const SPEED = 0.085; // pixels per millisecond, roughly 85px a second

/**
 * The bouncing logo, after a minute and a half of nothing.
 *
 * Movement is driven off the frame delta rather than a fixed step, so it
 * travels at the same speed on a 60Hz laptop and a 120Hz phone. The hue shifts
 * on every wall it hits, which is the bit everyone waited to see line up with
 * a corner.
 *
 * Anything at all dismisses it, and it never runs for anyone who has asked for
 * reduced motion.
 */
export function ScreenSaver() {
  const [active, setActive] = useState(false);
  const [allowed, setAllowed] = useState(false);

  const logo = useRef<HTMLImageElement>(null);
  const frame = useRef<number | null>(null);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setAllowed(!query.matches);
    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  const resetIdle = useCallback(() => {
    if (idleTimer.current) clearTimeout(idleTimer.current);
    if (!allowed) return;
    idleTimer.current = setTimeout(() => setActive(true), IDLE_MS);
  }, [allowed]);

  // Watch for signs of life.
  useEffect(() => {
    if (!allowed) return;

    const wake = () => {
      setActive((wasActive) => {
        if (wasActive) return false;
        return wasActive;
      });
      resetIdle();
    };

    const events = ["mousemove", "mousedown", "keydown", "wheel", "touchstart", "scroll"];
    events.forEach((event) => window.addEventListener(event, wake, { passive: true }));
    resetIdle();

    return () => {
      events.forEach((event) => window.removeEventListener(event, wake));
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [allowed, resetIdle]);

  // The bounce.
  useEffect(() => {
    if (!active) return;

    const element = logo.current;
    if (!element) return;

    const width = element.offsetWidth || 220;
    const height = element.offsetHeight || 130;

    let x = Math.random() * Math.max(1, window.innerWidth - width);
    let y = Math.random() * Math.max(1, window.innerHeight - height);
    let dx = Math.random() > 0.5 ? 1 : -1;
    let dy = Math.random() > 0.5 ? 1 : -1;
    let hue = 0;
    let last = performance.now();

    const step = (now: number) => {
      const delta = Math.min(now - last, 50); // ignore a backgrounded tab's jump
      last = now;

      const maxX = window.innerWidth - width;
      const maxY = window.innerHeight - height;

      x += dx * SPEED * delta;
      y += dy * SPEED * delta;

      if (x <= 0 || x >= maxX) {
        dx = -dx;
        x = Math.min(Math.max(x, 0), Math.max(maxX, 0));
        hue = (hue + 55) % 360;
      }
      if (y <= 0 || y >= maxY) {
        dy = -dy;
        y = Math.min(Math.max(y, 0), Math.max(maxY, 0));
        hue = (hue + 55) % 360;
      }

      element.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      element.style.filter = `hue-rotate(${hue}deg)`;
      frame.current = requestAnimationFrame(step);
    };

    frame.current = requestAnimationFrame(step);
    return () => {
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [active]);

  if (!allowed || !active) return null;

  return (
    <div
      className="fixed inset-0 z-[100] overflow-hidden bg-[#080611]"
      onClick={() => setActive(false)}
      role="presentation"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={logo}
        src="/photos/genx-logo.png"
        alt=""
        className="absolute left-0 top-0 w-[180px] will-change-transform sm:w-[240px]"
        draggable={false}
      />

      <p className="absolute bottom-6 left-0 right-0 text-center text-[12px] uppercase tracking-[0.2em] text-white/25">
        Move the mouse to continue
      </p>
    </div>
  );
}
