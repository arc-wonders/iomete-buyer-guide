"use client";
import { useEffect, useRef, useState } from "react";
import { factById } from "@/lib/facts";
import type { State } from "@/lib/types";

/**
 * Shared primitives for the page pictures. Page agents may USE these but should not change their
 * signatures; add page-specific helpers inside the page's own file instead.
 */
export type Pick = (factId: string) => void;
export const CDN = "https://cdn.prod.website-files.com/679e8e39ccda840d403b4bb5/";

export const C = {
  lime: "#d3f52c", ink: "#1d211d", ink2: "#5a5f59", ink3: "#8e8e8c", rule: "#d9d9d3",
  green: "#e3f1e3", greenInk: "#2d382d", grey: "#ececE6", dark: "#2d382d",
  documented: "#4e664e", claimed: "#c07a2c", unknown: "#c4472f",
};

export function Dot({ state }: { state: State }) {
  return <span className={`dot dot-${state}`} aria-label={state} />;
}

/** A tappable statement in picture form: a dot for its evidence state and a few words. */
export function Tile({ id, label, onPick }: { id: string; label: string; onPick: Pick }) {
  const f = factById[id];
  if (!f) return null;
  return (
    <button className={`tile tile-${f.state}`} onClick={() => onPick(id)} title={f.text}>
      <Dot state={f.state} />
      <span>{label}</span>
    </button>
  );
}

/**
 * True once the element has scrolled into view (stays true). Use it to start an animation when
 * the reader reaches a picture instead of on page load. Honors prefers-reduced-motion by
 * returning true immediately.
 */
export function useInView<T extends Element>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setSeen(true); return; }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect(); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen] as const;
}

/**
 * A product screenshot that is readable. Shows a cropped, zoomed detail (`focus` = CSS
 * object-position of the interesting area, `zoom` = scale of the crop) and opens the full image
 * in a lightbox on click. Esc or click closes.
 */
export function Shot({ src, alt, caption, focus = "top left", zoom = 1, className = "" }: {
  src: string; alt: string; caption?: React.ReactNode; focus?: string; zoom?: number; className?: string;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [open]);
  return (
    <figure className={`shot ${className}`}>
      <button className="shot-frame" onClick={() => setOpen(true)} aria-label={`Enlarge: ${alt}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} loading="lazy" style={{ objectPosition: focus, transform: `scale(${zoom})`, transformOrigin: focus }} />
        <span className="shot-zoom" aria-hidden="true">⤢</span>
      </button>
      {caption && <figcaption>{caption}</figcaption>}
      {open && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={alt} onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} alt={alt} />
          {caption && <p>{caption}</p>}
          <button className="lightbox-close" aria-label="Close">×</button>
        </div>
      )}
    </figure>
  );
}
