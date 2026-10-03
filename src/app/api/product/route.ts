import productData from "@/data/product.json";
import type { Product } from "@/types/product";

const product = productData as Product;

export function GET() {
  return Response.json(product);
}
