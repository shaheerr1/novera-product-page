export type CurrencyCode = "GBP";

export type ColourId = "grey" | "charcoal" | "mustard" | "lime" | "pink";

export type Size = "S" | "M" | "L" | "XL";

export interface Price {
  amount: number;
  currency: CurrencyCode;
}

export interface Rating {
  average: number;
  count: number;
}

export interface Colour {
  id: ColourId;
  name: string;
  hex: string;
}

export interface ProductImage {
  src: string;
  alt: string;
}

/** Units in stock for every colour and size combination. */
export type StockMatrix = Record<ColourId, Record<Size, number>>;

export interface Product {
  id: string;
  brand: string;
  name: string;
  price: Price;
  rating: Rating;
  description: string;
  colours: Colour[];
  sizes: Size[];
  stock: StockMatrix;
  images: ProductImage[];
}
