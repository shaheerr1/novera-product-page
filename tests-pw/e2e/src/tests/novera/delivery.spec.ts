import { test, expect } from "../../e2e";

test.describe("Delivery estimate", () => {
  test("the delivery date range is calculated from the visitor's date after load", async ({
    productPage,
    profile,
    page,
  }) => {
    // Monday 5 October 2026: 3 to 5 working days ahead is Thursday 8 to Monday 12.
    await page.clock.setFixedTime(new Date(2026, 9, 5, 10));
    await productPage.gotoProduct(profile.data.products[0].path);

    await expect(page.getByText("Oct 08-12", { exact: true })).toBeVisible();
    await expect(page.getByText("Calculating delivery date")).toHaveCount(0);
  });
});
