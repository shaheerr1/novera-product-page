"use client";

import { useState } from "react";
import { revealProps } from "@/lib/reveal";
import { convertFromInches, type Unit } from "@/lib/units";
import type { SizeChart as SizeChartData } from "@/types/product";

const UNITS: { value: Unit; label: string; heading: string }[] = [
  { value: "inch", label: "INCH", heading: "In inches" },
  { value: "cm", label: "CM", heading: "In cm" },
];

interface SizeChartProps {
  chart: SizeChartData;
}

export default function SizeChart({ chart }: SizeChartProps) {
  const [unit, setUnit] = useState<Unit>("inch");
  const unitHeading = UNITS.find(({ value }) => value === unit)?.heading;

  return (
    <section id="size-chart" className="size-chart" aria-labelledby="size-chart-title">
      <h2 id="size-chart-title" className="size-chart__title" {...revealProps(0)}>
        Size chart - {unitHeading} (Expected Deviation &lt; 3%)
      </h2>

      <div
        className="size-chart__toggle"
        role="group"
        aria-label="Measurement unit"
        {...revealProps(1)}
      >
        {UNITS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            className={`size-chart__unit${value === unit ? " size-chart__unit--active" : ""}`}
            aria-pressed={value === unit}
            onClick={() => setUnit(value)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="size-chart__panel" {...revealProps(2)}>
        <table className="size-chart__table">
          <caption className="visually-hidden">
            Garment measurements by size, {unitHeading?.replace("In ", "in ")}
          </caption>
          <thead>
            <tr>
              <th scope="col" className="size-chart__heading">
                Size
              </th>
              {chart.columns.map(({ key, label }) => (
                <th key={key} scope="col" className="size-chart__heading">
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((row) => (
              <tr key={row.size}>
                <th scope="row" className="size-chart__cell">
                  {row.size}
                </th>
                {chart.columns.map(({ key }) => (
                  <td key={key} className="size-chart__cell">
                    {convertFromInches(row[key], unit)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
