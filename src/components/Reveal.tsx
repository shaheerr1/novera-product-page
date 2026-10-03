"use client";

import { useEffect, useRef, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
}

const ITEM_SELECTOR = "[data-reveal]";

/**
 * Staggered scroll reveal. Every descendant marked with `revealProps(index)`
 * rises into place once, the first time it scrolls about 15% into view.
 *
 * Progressive enhancement: the server HTML has no hidden state. Items are only
 * set to "pending" (hidden) after mount, and only when motion is allowed and
 * IntersectionObserver exists, so content stays visible if JavaScript fails.
 * State lives in a data attribute React never renders, so re-renders leave it alone.
 */
export default function Reveal({ children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? true;
    if (!root || reduceMotion || !("IntersectionObserver" in window)) return;

    const items = Array.from(root.querySelectorAll<HTMLElement>(ITEM_SELECTOR));

    // One observer for every item.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const item = entry.target as HTMLElement;
          item.dataset.revealState = "animating";
          observer.unobserve(item);
        }
      },
      { rootMargin: "0px 0px -15% 0px" },
    );

    // Drop the transition and will-change once an item has settled.
    function handleTransitionEnd(event: TransitionEvent) {
      const item = event.target as HTMLElement;
      if (event.propertyName === "transform" && item.dataset.revealState === "animating") {
        item.dataset.revealState = "done";
      }
    }

    for (const item of items) {
      item.dataset.revealState = "pending";
      observer.observe(item);
    }
    root.addEventListener("transitionend", handleTransitionEnd);

    return () => {
      observer.disconnect();
      root.removeEventListener("transitionend", handleTransitionEnd);
      for (const item of items) delete item.dataset.revealState;
    };
  }, []);

  return <div ref={ref}>{children}</div>;
}
