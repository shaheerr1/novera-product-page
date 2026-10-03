import type { CSSProperties } from "react";

/**
 * Marks an element for the staggered scroll reveal inside a <Reveal> container.
 * `index` is its position within its group and sets the stagger delay.
 */
export function revealProps(index: number) {
  return {
    "data-reveal": "",
    style: { "--reveal-index": index } as CSSProperties,
  };
}
