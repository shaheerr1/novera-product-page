import { addWorkingDays, formatDeliveryRange, getDeliveryRange } from "../delivery";

// Months are zero based: new Date(2026, 9, 5) is Monday 5 October 2026.
describe("addWorkingDays", () => {
  it("counts only weekdays", () => {
    expect(addWorkingDays(new Date(2026, 9, 5), 3)).toEqual(new Date(2026, 9, 8)); // Mon -> Thu
  });

  it("skips the weekend", () => {
    expect(addWorkingDays(new Date(2026, 9, 8), 3)).toEqual(new Date(2026, 9, 13)); // Thu -> Tue
  });

  it("starts counting from the next working day when ordered at the weekend", () => {
    expect(addWorkingDays(new Date(2026, 9, 3), 1)).toEqual(new Date(2026, 9, 5)); // Sat -> Mon
  });
});

describe("getDeliveryRange", () => {
  it("is 3 to 5 working days ahead within one week", () => {
    const range = getDeliveryRange(new Date(2026, 9, 5)); // Mon
    expect(range.start).toEqual(new Date(2026, 9, 8)); // Thu
    expect(range.end).toEqual(new Date(2026, 9, 12)); // Mon
    expect(formatDeliveryRange(range)).toBe("Oct 08-12");
  });

  it("spans a weekend", () => {
    const range = getDeliveryRange(new Date(2026, 9, 8)); // Thu
    expect(range.start).toEqual(new Date(2026, 9, 13)); // Tue
    expect(range.end).toEqual(new Date(2026, 9, 15)); // Thu
    expect(formatDeliveryRange(range)).toBe("Oct 13-15");
  });

  it("names both months when the range crosses a month boundary", () => {
    const range = getDeliveryRange(new Date(2026, 9, 27)); // Tue
    expect(formatDeliveryRange(range)).toBe("Oct 30-Nov 03");
  });
});
