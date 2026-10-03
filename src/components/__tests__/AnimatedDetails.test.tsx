import { fireEvent, render, screen } from "@testing-library/react";
import AnimatedDetails from "../AnimatedDetails";

describe("AnimatedDetails", () => {
  const originalAnimate = Element.prototype.animate;

  beforeEach(() => {
    // No Web Animations API: the component must fall back to an instant toggle.
    Object.defineProperty(Element.prototype, "animate", { value: undefined, configurable: true });
  });

  afterEach(() => {
    Object.defineProperty(Element.prototype, "animate", {
      value: originalAnimate,
      configurable: true,
    });
  });

  function renderDetails(defaultOpen = false) {
    const { container } = render(
      <AnimatedDetails summary="Free Shipping Worldwide" defaultOpen={defaultOpen}>
        <p>Every order ships free.</p>
      </AnimatedDetails>,
    );
    return container.querySelector("details")!;
  }

  it("toggles open on summary click and always renders the content", () => {
    const details = renderDetails();
    expect(details.open).toBe(false);
    // The content is in the DOM even while closed (native <details> hides it).
    expect(screen.getByText("Every order ships free.")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Free Shipping Worldwide"));
    expect(details.open).toBe(true);
    expect(details).toHaveAttribute("data-state", "open");

    fireEvent.click(screen.getByText("Free Shipping Worldwide"));
    expect(details.open).toBe(false);
    expect(details).toHaveAttribute("data-state", "closed");
  });

  it("starts open without animating when defaultOpen is set", () => {
    const details = renderDetails(true);
    expect(details.open).toBe(true);
    expect(details).not.toHaveAttribute("data-state");
  });
});
