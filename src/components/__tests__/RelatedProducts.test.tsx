import { render, screen } from "@testing-library/react";
import RelatedProducts from "../RelatedProducts";
import relatedData from "@/data/related.json";
import type { RelatedProduct } from "@/types/product";

const products = relatedData as RelatedProduct[];

describe("RelatedProducts", () => {
  it("renders both products with formatted prices and the badge", () => {
    render(<RelatedProducts products={products} />);

    expect(screen.getByRole("heading", { name: "You May Also Like" })).toBeInTheDocument();
    expect(screen.getByText("Sable crossbody bag")).toBeInTheDocument();
    expect(screen.getByText("Crestline wool coat")).toBeInTheDocument();
    expect(screen.getByText("£64.99")).toBeInTheDocument();
    expect(screen.getByText("£48.99")).toBeInTheDocument();
    expect(screen.getAllByText("Trending")).toHaveLength(1);
    expect(screen.getAllByRole("link")).toHaveLength(2);
  });
});
