import Image from "next/image";
import { formatPrice } from "@/lib/format";
import { revealProps } from "@/lib/reveal";
import type { RelatedProduct } from "@/types/product";

// Two cards per row at every width: about half the left column on desktop,
// a quarter of the viewport on tablet, half on mobile.
const CARD_SIZES = "(min-width: 1024px) 250px, (min-width: 768px) 25vw, 50vw";

interface RelatedProductsProps {
  products: RelatedProduct[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  return (
    <section className="related-products" aria-labelledby="related-products-title">
      <h2 id="related-products-title" className="related-products__title" {...revealProps(0)}>
        You May Also Like
      </h2>
      <ul className="related-products__list">
        {products.map(({ id, name, price, category, badge, image }, index) => (
          <li key={id} className="related-products__item" {...revealProps(index + 1)}>
            <a className="related-products__card" href="#">
              <span className="related-products__media">
                <Image
                  className="related-products__image"
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes={CARD_SIZES}
                  // Per-image crop is data, so it is applied inline.
                  style={{ objectPosition: image.objectPosition }}
                />
                {badge && <span className="related-products__badge">{badge}</span>}
              </span>
              <span className="related-products__price">{formatPrice(price)}</span>
              <span className="related-products__name">{name}</span>
              <span className="related-products__category">{category}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
