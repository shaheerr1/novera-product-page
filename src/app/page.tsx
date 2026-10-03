import ProductGallery from "@/components/ProductGallery";
import ProductInfo from "@/components/ProductInfo";
import SiteHeader from "@/components/SiteHeader";
import { CartProvider } from "@/context/CartContext";
import productData from "@/data/product.json";
import type { Product } from "@/types/product";

const product = productData as Product;

export default function Home() {
  return (
    <CartProvider>
      <SiteHeader />
      <main className="product-page">
        <section className="product-page__gallery">
          <ProductGallery images={product.images} />
        </section>
        <section className="product-page__info">
          <ProductInfo product={product} />
        </section>
      </main>
    </CartProvider>
  );
}
