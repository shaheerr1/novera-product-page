import { fireEvent, render, screen, within } from "@testing-library/react";
import SizeChart from "../SizeChart";
import sizeChartData from "@/data/size-chart.json";
import type { SizeChart as SizeChartData } from "@/types/product";

const chart = sizeChartData as SizeChartData;

function rowValues(size: string) {
  const row = screen.getByRole("rowheader", { name: size }).closest("tr")!;
  return within(row)
    .getAllByRole("cell")
    .map((cell) => cell.textContent);
}

describe("SizeChart", () => {
  it("defaults to inches with values shown exactly as stored", () => {
    render(<SizeChart chart={chart} />);
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Size chart - In inches");
    expect(screen.getByRole("button", { name: "INCH" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "CM" })).toHaveAttribute("aria-pressed", "false");
    expect(rowValues("M")).toEqual(["39", "27.5", "8.5"]);
    expect(rowValues("L")).toEqual(["40.5", "28", "8.75"]);
  });

  it("switches the heading and values to cm and back", () => {
    render(<SizeChart chart={chart} />);

    fireEvent.click(screen.getByRole("button", { name: "CM" }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Size chart - In cm");
    expect(screen.getByRole("button", { name: "CM" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "INCH" })).toHaveAttribute("aria-pressed", "false");
    expect(rowValues("M")).toEqual(["99.1", "69.9", "21.6"]);
    expect(rowValues("L")).toEqual(["102.9", "71.1", "22.2"]);

    fireEvent.click(screen.getByRole("button", { name: "INCH" }));
    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Size chart - In inches");
    expect(screen.getByRole("button", { name: "INCH" })).toHaveAttribute("aria-pressed", "true");
    expect(rowValues("M")).toEqual(["39", "27.5", "8.5"]);
  });
});
