import ProductGallery from "@/components/ProductGallery";
import productData from "@/data/product.json";
import type { Product } from "@/types/product";

const product = productData as Product;

export default function Home() {
  return (
    <main className="product-page">
      <section className="product-page__gallery">
        <ProductGallery images={product.images} />
      </section>
      <section className="product-page__info">Info</section>
    </main>
  );
}
