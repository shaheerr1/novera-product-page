import { fireEvent, render, screen, within } from "@testing-library/react";
import ProductGallery from "../ProductGallery";
import type { ProductImage } from "@/types/product";

const images: ProductImage[] = [1, 2, 3, 4, 5].map((n) => ({
  src: `/images/novera/${n}.jpg`,
  alt: `Jacket view ${n}`,
}));

function getMainImage() {
  return within(screen.getByTestId("gallery-main")).getByRole("img");
}

describe("ProductGallery", () => {
  it("shows the clicked thumbnail as the main image", () => {
    render(<ProductGallery images={images} />);
    expect(getMainImage()).toHaveAttribute("alt", "Jacket view 1");

    const third = screen.getByRole("button", { name: "Show image 3 of 5" });
    fireEvent.click(third);

    expect(getMainImage()).toHaveAttribute("alt", "Jacket view 3");
    expect(third).toHaveAttribute("aria-current", "true");
    expect(screen.getByRole("button", { name: "Show image 1 of 5" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("moves the active thumbnail with the arrow keys", () => {
    render(<ProductGallery images={images} />);
    const first = screen.getByRole("button", { name: "Show image 1 of 5" });
    const second = screen.getByRole("button", { name: "Show image 2 of 5" });
    const last = screen.getByRole("button", { name: "Show image 5 of 5" });

    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    expect(second).toHaveAttribute("aria-current", "true");
    expect(second).toHaveFocus();
    expect(getMainImage()).toHaveAttribute("alt", "Jacket view 2");

    fireEvent.keyDown(second, { key: "ArrowLeft" });
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(last).toHaveAttribute("aria-current", "true");
    expect(last).toHaveFocus();
  });
});
