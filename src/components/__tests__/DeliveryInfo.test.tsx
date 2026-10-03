import { render, screen } from "@testing-library/react";
import { renderToString } from "react-dom/server";
import DeliveryInfo from "../DeliveryInfo";

describe("DeliveryInfo", () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  it("renders a placeholder, not a date, in server HTML", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 9, 5));
    const html = renderToString(<DeliveryInfo />);

    expect(html).toContain("Calculating delivery date");
    expect(html).not.toContain("Oct 08-12");
  });

  it("shows the range from the visitor's current date after mount", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 9, 5)); // Monday 5 October 2026
    render(<DeliveryInfo />);

    expect(screen.getByText("Oct 08-12")).toBeInTheDocument();
    expect(screen.queryByText("Calculating delivery date")).not.toBeInTheDocument();
  });

  it("crosses the weekend for an order placed on a Thursday", () => {
    jest.useFakeTimers().setSystemTime(new Date(2026, 9, 8)); // Thursday
    render(<DeliveryInfo />);

    expect(screen.getByText("Oct 13-15")).toBeInTheDocument();
  });
});
