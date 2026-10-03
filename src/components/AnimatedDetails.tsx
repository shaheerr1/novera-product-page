"use client";

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";

const DURATION_MS = 300;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const SHIFT = "translateY(8px)";

interface AnimatedDetailsProps {
  summary: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  summaryClassName?: string;
  contentClassName?: string;
  style?: CSSProperties;
  "data-reveal"?: string;
}

function prefersReducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/**
 * A native <details> with an animated open and close. Without JavaScript it is
 * a plain <details>. With JavaScript, the summary click is intercepted and the
 * content's height, opacity and offset are animated with the Web Animations
 * API. Clicking mid-animation reverses from the current values. With reduced
 * motion, or no element.animate, it toggles instantly.
 *
 * data-state ("open" / "closed") tracks where the item is heading, so the
 * icon can turn as soon as the user clicks rather than when closing finishes.
 * It is only ever set by JavaScript; without it, CSS falls back to [open].
 */
export default function AnimatedDetails({
  summary,
  children,
  defaultOpen = false,
  className,
  summaryClassName,
  contentClassName,
  ...rest
}: AnimatedDetailsProps) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animations = useRef<Animation[]>([]);

  function stopAnimations() {
    for (const animation of animations.current) animation.cancel();
    animations.current = [];
  }

  function handleClick(event: MouseEvent<HTMLElement>) {
    const details = detailsRef.current;
    const content = contentRef.current;
    if (!details || !content) return;
    event.preventDefault();

    const animating = animations.current.length > 0;
    // Mid-animation, the target is the opposite of where it was heading.
    const opening = animating ? details.dataset.state !== "open" : !details.open;
    details.dataset.state = opening ? "open" : "closed";

    if (typeof content.animate !== "function" || prefersReducedMotion()) {
      stopAnimations();
      details.open = opening;
      return;
    }

    // Read the current (possibly mid-animation) values before cancelling.
    const inner = content.firstElementChild as HTMLElement | null;
    const fromHeight = details.open ? content.getBoundingClientRect().height : 0;
    const fromOpacity = animating ? getComputedStyle(content).opacity : opening ? "0" : "1";
    const fromTransform =
      animating && inner ? getComputedStyle(inner).transform : opening ? SHIFT : "none";
    stopAnimations();

    details.open = true; // content must be rendered to measure and animate it
    const toHeight = opening ? content.scrollHeight : 0;
    const options: KeyframeAnimationOptions = {
      duration: DURATION_MS,
      easing: EASING,
      fill: "forwards",
    };

    const heightAnimation = content.animate(
      [
        { height: `${fromHeight}px`, opacity: fromOpacity, overflow: "hidden" },
        { height: `${toHeight}px`, opacity: opening ? 1 : 0, overflow: "hidden" },
      ],
      options,
    );
    animations.current = [heightAnimation];
    if (inner) {
      animations.current.push(
        inner.animate(
          [
            { transform: fromTransform === "none" ? "translateY(0)" : fromTransform },
            { transform: opening ? "translateY(0)" : SHIFT },
          ],
          options,
        ),
      );
    }

    heightAnimation.onfinish = () => {
      if (!opening) details.open = false;
      stopAnimations(); // removes the forwards fill, back to natural height
    };
  }

  // Keeps data-state right when the browser opens the item itself (for
  // example find-in-page) rather than through a click.
  function handleToggle() {
    const details = detailsRef.current;
    if (details && animations.current.length === 0) {
      details.dataset.state = details.open ? "open" : "closed";
    }
  }

  return (
    <details
      ref={detailsRef}
      className={className}
      open={defaultOpen}
      onToggle={handleToggle}
      {...rest}
    >
      <summary className={summaryClassName} onClick={handleClick}>
        {summary}
      </summary>
      <div ref={contentRef} className={contentClassName}>
        {children}
      </div>
    </details>
  );
}
