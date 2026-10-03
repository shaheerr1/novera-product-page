import type { Price } from "@/types/product";

export function formatPrice({ amount, currency }: Price): string {
  return new Intl.NumberFormat("en-GB", { style: "currency", currency }).format(amount);
}

/** 2500 -> "2.5K". en-US, because en-GB gives "2.5k" in some browsers but "2.5K" in Node, which breaks hydration. */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}
