import { firstAvailableSize, getStock, isInStock } from "../stock";
import type { Size, StockMatrix } from "@/types/product";

const sizes: Size[] = ["S", "M", "L", "XL"];
const stock: StockMatrix = {
  sage: { S: 12, M: 18, L: 9, XL: 4 },
  charcoal: { S: 7, M: 0, L: 15, XL: 6 },
  mustard: { S: 0, M: 5, L: 3, XL: 0 },
  lime: { S: 0, M: 0, L: 0, XL: 2 },
  pink: { S: 0, M: 0, L: 0, XL: 0 },
};

describe("getStock", () => {
  it("returns the units for a colour and size", () => {
    expect(getStock(stock, "charcoal", "L")).toBe(15);
    expect(getStock(stock, "mustard", "S")).toBe(0);
  });

  it("reports whether a combination is in stock", () => {
    expect(isInStock(stock, "sage", "XL")).toBe(true);
    expect(isInStock(stock, "charcoal", "M")).toBe(false);
  });
});

describe("firstAvailableSize", () => {
  it("returns the first size in display order that has stock", () => {
    expect(firstAvailableSize(stock, "sage", sizes)).toBe("S");
    expect(firstAvailableSize(stock, "mustard", sizes)).toBe("M");
    expect(firstAvailableSize(stock, "lime", sizes)).toBe("XL");
  });

  it("returns null when the colour is sold out in every size", () => {
    expect(firstAvailableSize(stock, "pink", sizes)).toBeNull();
  });
});
