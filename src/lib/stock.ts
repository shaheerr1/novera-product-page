import type { ColourId, Size, StockMatrix } from "@/types/product";

/** Units in stock for one colour and size. Unknown combinations count as zero. */
export function getStock(stock: StockMatrix, colour: ColourId, size: Size): number {
  return stock[colour]?.[size] ?? 0;
}

export function isInStock(stock: StockMatrix, colour: ColourId, size: Size): boolean {
  return getStock(stock, colour, size) > 0;
}

/** First size (in display order) that has stock for the colour, or null if none do. */
export function firstAvailableSize(
  stock: StockMatrix,
  colour: ColourId,
  sizes: readonly Size[],
): Size | null {
  return sizes.find((size) => isInStock(stock, colour, size)) ?? null;
}
