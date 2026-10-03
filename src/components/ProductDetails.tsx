import { revealProps } from "@/lib/reveal";
import AnimatedDetails from "./AnimatedDetails";
import { PlusIcon } from "./icons";

const ITEMS = [
  {
    title: "Free Shipping Worldwide",
    body: "Every order ships free, wherever you are, with tracking from dispatch to your door.",
  },
  {
    title: "Easy Returns & Exchanges",
    body: "If your purchase isn't quite right, you can request a return or exchange within our return period, subject to our policy terms.",
    open: true,
  },
  {
    title: "Premium Quality Materials",
    body: "Cut from soft cotton twill and finished with reinforced stitching, built to hold its shape wash after wash.",
  },
];

export default function ProductDetails() {
  return (
    <section id="product-details" className="product-details" aria-label="Product details">
      {ITEMS.map(({ title, body, open }, index) => (
        <AnimatedDetails
          key={title}
          className="product-details__item"
          summaryClassName="product-details__summary"
          contentClassName="product-details__content"
          defaultOpen={open}
          summary={
            <>
              <h3 className="product-details__title">{title}</h3>
              <PlusIcon className="product-details__icon" />
            </>
          }
          {...revealProps(index)}
        >
          <p className="product-details__body">{body}</p>
        </AnimatedDetails>
      ))}
    </section>
  );
}
