"use client";

import { useEffect, useRef, useState } from "react";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { firstAvailableSize, getStock } from "@/lib/stock";
import type { ColourId, Product, Size } from "@/types/product";
import DeliveryInfo from "./DeliveryInfo";
import QuantityStepper from "./QuantityStepper";
import StarRating from "./StarRating";
import VariantPicker from "./VariantPicker";
import { ExternalLinkIcon, HeartIcon, TagIcon } from "./icons";

const ADDED_DURATION_MS = 2000;

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { addToCart } = useCart();
  const initialColour = product.colours[0].id;

  const [colour, setColour] = useState<ColourId>(initialColour);
  const [size, setSize] = useState<Size>(
    () => firstAvailableSize(product.stock, initialColour, product.sizes) ?? product.sizes[0],
  );
  const [quantity, setQuantity] = useState(1);
  const [favourite, setFavourite] = useState(false);
  const [added, setAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stock = getStock(product.stock, colour, size);
  const inStock = stock > 0;

  useEffect(
    () => () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
    },
    [],
  );

  function handleColourChange(next: ColourId) {
    setColour(next);
    if (getStock(product.stock, next, size) === 0) {
      setSize(firstAvailableSize(product.stock, next, product.sizes) ?? size);
    }
    setQuantity(1);
  }

  function handleSizeChange(next: Size) {
    setSize(next);
    setQuantity(1);
  }

  function handleAddToCart() {
    addToCart({ productId: product.id, colour, size, quantity });
    setAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAdded(false), ADDED_DURATION_MS);
  }

  return (
    <div className="product-info">
      <StarRating average={product.rating.average} count={product.rating.count} />

      <h1 className="product-info__title">{product.name}</h1>
      <p className="product-info__price">{formatPrice(product.price)}</p>

      <p className="product-info__description">
        {product.description}{" "}
        <a className="product-info__learn-more" href="#product-details">
          Learn More
          <ExternalLinkIcon className="product-info__learn-more-icon" />
        </a>
      </p>

      <ul className="product-info__meta">
        <li className="product-info__meta-item">
          <button
            type="button"
            className={`product-info__meta-action${favourite ? " product-info__meta-action--active" : ""}`}
            aria-pressed={favourite}
            onClick={() => setFavourite((current) => !current)}
          >
            <HeartIcon className="product-info__meta-icon product-info__heart" />
            Add to Favourite
          </button>
        </li>
        <li className="product-info__meta-item">
          <a className="product-info__meta-action" href="#size-chart">
            <TagIcon className="product-info__meta-icon" />
            Size Guide
          </a>
        </li>
        <li className="product-info__meta-item">
          <p
            className={`product-info__stock${inStock ? "" : " product-info__stock--out"}`}
            aria-live="polite"
          >
            {inStock ? `${stock} In Stock` : "Out of Stock"}
          </p>
        </li>
      </ul>

      <div className="product-info__variants">
        <VariantPicker
          colours={product.colours}
          sizes={product.sizes}
          stock={product.stock}
          colour={colour}
          size={size}
          onColourChange={handleColourChange}
          onSizeChange={handleSizeChange}
        />
      </div>

      <div className="product-info__purchase">
        <QuantityStepper
          key={`${colour}-${size}`}
          value={quantity}
          max={stock}
          onChange={setQuantity}
        />
        <button
          type="button"
          className="product-info__add"
          disabled={!inStock}
          onClick={handleAddToCart}
        >
          {added ? "Added" : "Add to Cart"}
        </button>
        <p className="visually-hidden" aria-live="polite">
          {added ? "Added to basket" : ""}
        </p>
      </div>

      <div className="product-info__delivery">
        <DeliveryInfo />
      </div>
    </div>
  );
}
