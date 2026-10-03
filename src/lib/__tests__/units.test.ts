import { convertFromInches, inchesToCm } from "../units";

describe("inchesToCm", () => {
  it("converts and rounds to one decimal place", () => {
    expect(inchesToCm(27.5)).toBe(69.9);
    expect(inchesToCm(8.75)).toBe(22.2);
    expect(inchesToCm(39)).toBe(99.1);
    expect(inchesToCm(40.5)).toBe(102.9);
  });

  it("keeps whole results whole", () => {
    expect(inchesToCm(0)).toBe(0);
    expect(inchesToCm(10)).toBe(25.4);
  });
});

describe("convertFromInches", () => {
  it("returns inch values unchanged", () => {
    expect(convertFromInches(8.75, "inch")).toBe(8.75);
  });

  it("converts to cm", () => {
    expect(convertFromInches(8.75, "cm")).toBe(22.2);
  });
});
