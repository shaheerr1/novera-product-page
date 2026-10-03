export type Unit = "inch" | "cm";

/**
 * Inches to centimetres, rounded to one decimal place. Multiplying by the
 * integer 254 first keeps chart values exact (27.5 * 254 = 6985), avoiding the
 * floating point error of `x * 2.54` that can tip a .x5 value the wrong way.
 */
export function inchesToCm(inches: number): number {
  return Math.round((inches * 254) / 10) / 10;
}

/** A measurement stored in inches, in the requested unit. */
export function convertFromInches(inches: number, unit: Unit): number {
  return unit === "cm" ? inchesToCm(inches) : inches;
}
