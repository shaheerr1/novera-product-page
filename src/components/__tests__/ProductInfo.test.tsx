import { fireEvent, render, screen } from "@testing-library/react";
import ProductInfo from "../ProductInfo";
import SiteHeader from "../SiteHeader";
import { CartProvider } from "@/context/CartContext";
import productData from "@/data/product.json";
import type { Product } from "@/types/product";

const product = productData as Product;

function renderPage() {
  return render(
    <CartProvider>
      <SiteHeader />
      <ProductInfo product={product} />
    </CartProvider>,
  );
}

describe("ProductInfo", () => {
  it("updates the stock text for the selected colour and moves off a sold out size", () => {
    renderPage();
    // Sage, size S
    expect(screen.getByText("12 In Stock")).toBeInTheDocument();

    // Mustard has no S, so the size moves to the first available one (M: 5)
    fireEvent.click(screen.getByRole("radio", { name: "Mustard" }));
    expect(screen.getByRole("radio", { name: "Mustard" })).toBeChecked();
    expect(screen.getByRole("radio", { name: "M" })).toBeChecked();
    expect(screen.getByText("5 In Stock")).toBeInTheDocument();
  });

  it("disables sizes that are out of stock for the selected colour", () => {
    renderPage();
    fireEvent.click(screen.getByRole("radio", { name: "Mustard" }));

    expect(screen.getByRole("radio", { name: "S (out of stock)" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "XL (out of stock)" })).toBeDisabled();
    expect(screen.getByRole("radio", { name: "M" })).toBeEnabled();
    expect(screen.getByRole("radio", { name: "L" })).toBeEnabled();
  });

  it("adds the selected quantity to the basket and updates the header badge", () => {
    renderPage();
    expect(screen.getByRole("button", { name: "Basket, 0 items" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Increase quantity" }));
    expect(screen.getByLabelText("Quantity")).toHaveValue("02");

    fireEvent.click(screen.getByRole("button", { name: "Add to Cart" }));

    expect(screen.getByRole("button", { name: "Basket, 2 items" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Added" })).toBeInTheDocument();
    expect(screen.getByText("Added to basket")).toBeInTheDocument();
  });

  it("clamps a typed quantity to the stock of the selected variant on blur", () => {
    renderPage();
    const input = screen.getByLabelText("Quantity");

    fireEvent.change(input, { target: { value: "99" } });
    fireEvent.blur(input);
    expect(input).toHaveValue("12");
    expect(screen.getByRole("button", { name: "Increase quantity" })).toBeDisabled();

    fireEvent.change(input, { target: { value: "0" } });
    fireEvent.blur(input);
    expect(input).toHaveValue("01");
    expect(screen.getByRole("button", { name: "Decrease quantity" })).toBeDisabled();
  });
});
