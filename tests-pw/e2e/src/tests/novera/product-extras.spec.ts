import { test, expect } from "../../e2e";

test.describe("Product extras", () => {
  test.beforeEach(async ({ productPage, profile }) => {
    await productPage.gotoProduct(profile.data.products[0].path);
  });

  test("the size chart switches between inches and centimetres", async ({ page }) => {
    const heading = page.getByRole("heading", { name: /^Size chart/ });
    const inch = page.getByRole("button", { name: "INCH" });
    const cm = page.getByRole("button", { name: "CM" });
    const rowM = page.getByRole("row", { name: /^M\b/ });

    await expect(heading).toContainText("In inches");
    await expect(inch).toHaveAttribute("aria-pressed", "true");
    await expect(rowM).toContainText("27.5");

    await cm.click();
    await expect(heading).toContainText("In cm");
    await expect(cm).toHaveAttribute("aria-pressed", "true");
    await expect(inch).toHaveAttribute("aria-pressed", "false");
    await expect(rowM).toContainText("69.9");

    await inch.click();
    await expect(heading).toContainText("In inches");
    await expect(rowM).toContainText("27.5");
  });

  test("opening an accordion item reveals its content", async ({ page }) => {
    const body = page.getByText(/^Every order ships free/);
    await expect(body).toBeHidden();

    await page.getByRole("heading", { name: "Free Shipping Worldwide" }).click();

    await expect(body).toBeVisible();
  });
});
