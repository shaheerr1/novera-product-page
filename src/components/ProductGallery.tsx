"use client";

import Image from "next/image";
import { useRef, useState, type KeyboardEvent, type UIEvent } from "react";
import type { ProductImage } from "@/types/product";

// Main image and swipe slides share one `sizes` value so the browser picks the
// same file for both and the first image is only downloaded once.
const MAIN_SIZES =
  "(min-width: 1280px) 520px, (min-width: 1024px) 45vw, (min-width: 768px) 50vw, 100vw";
const THUMB_SIZES = "(min-width: 1024px) 100px, 20vw";

interface ProductGalleryProps {
  images: ProductImage[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [slideIndex, setSlideIndex] = useState(0);
  const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const scrollFrame = useRef<number | null>(null);

  if (images.length === 0) return null;

  const total = images.length;
  const activeImage = images[activeIndex];

  function handleThumbKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (event.key === "ArrowRight") next = (index + 1) % total;
    else if (event.key === "ArrowLeft") next = (index - 1 + total) % total;
    else return;

    event.preventDefault();
    setActiveIndex(next);
    thumbRefs.current[next]?.focus();
  }

  function handleTrackScroll(event: UIEvent<HTMLDivElement>) {
    const track = event.currentTarget;
    if (scrollFrame.current !== null) cancelAnimationFrame(scrollFrame.current);
    scrollFrame.current = requestAnimationFrame(() => {
      scrollFrame.current = null;
      if (track.clientWidth === 0) return;
      const index = Math.round(track.scrollLeft / track.clientWidth);
      setSlideIndex(Math.min(Math.max(index, 0), total - 1));
    });
  }

  return (
    <div className="product-gallery">
      {/* Tablet and up: main image with thumbnails */}
      <div className="product-gallery__main" data-testid="gallery-main">
        <Image
          key={activeImage.src}
          className="product-gallery__image"
          src={activeImage.src}
          alt={activeImage.alt}
          fill
          sizes={MAIN_SIZES}
          preload={activeIndex === 0}
        />
      </div>

      <div className="product-gallery__thumbs">
        {images.map((image, index) => {
          const isActive = index === activeIndex;
          return (
            <button
              key={image.src}
              ref={(node) => {
                thumbRefs.current[index] = node;
              }}
              type="button"
              className={`product-gallery__thumb${isActive ? " product-gallery__thumb--active" : ""}`}
              aria-label={`Show image ${index + 1} of ${total}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => handleThumbKeyDown(event, index)}
            >
              <Image
                className="product-gallery__image"
                src={image.src}
                alt=""
                fill
                sizes={THUMB_SIZES}
              />
            </button>
          );
        })}
      </div>

      {/* Below tablet: swipeable track with dot indicators */}
      <div
        className="product-gallery__track"
        role="region"
        aria-label="Product images"
        tabIndex={0}
        onScroll={handleTrackScroll}
      >
        {images.map((image, index) => (
          <div
            key={image.src}
            className="product-gallery__slide"
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${total}`}
          >
            <Image
              className="product-gallery__image"
              src={image.src}
              alt={image.alt}
              fill
              sizes={MAIN_SIZES}
              loading={index === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
      </div>

      <div className="product-gallery__dots" aria-hidden="true">
        {images.map((image, index) => (
          <span
            key={image.src}
            className={`product-gallery__dot${index === slideIndex ? " product-gallery__dot--active" : ""}`}
          />
        ))}
      </div>
    </div>
  );
}
