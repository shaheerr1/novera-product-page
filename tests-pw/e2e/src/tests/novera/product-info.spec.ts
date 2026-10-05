import { test, expect } from "../../e2e";

test.describe("Product info", () => {
  test.beforeEach(async ({ productPage, profile }) => {
    await productPage.gotoProduct(profile.data.products[0].path);
  });

  test("shows the product name and price", async ({ productPage, page }) => {
    await expect(productPage.title).toBeVisible();
    await expect(page.getByText("£24.99", { exact: true })).toBeVisible();
  });

  test("selecting a colour updates the stock for the selected size", async ({
    productPage,
    page,
  }) => {
    // Sage, size S
    await expect(page.getByText("12 In Stock")).toBeVisible();

    // Mustard has no S, so the size moves to M (5 in stock)
    await productPage.variantButton("colour-mustard").click();
    await expect(productPage.variantButton("colour-mustard")).toBeChecked();
    await expect(page.getByText("5 In Stock")).toBeVisible();
  });

  test("sizes that are out of stock for the colour are disabled", async ({ productPage, page }) => {
    await productPage.variantButton("colour-mustard").click();

    await expect(page.getByRole("radio", { name: "S (out of stock)" })).toBeDisabled();
    await expect(page.getByRole("radio", { name: "XL (out of stock)" })).toBeDisabled();
    await expect(page.getByRole("radio", { name: "M", exact: true })).toBeEnabled();
    await expect(page.getByRole("radio", { name: "L", exact: true })).toBeEnabled();
  });

  test("quantity cannot go above the stock of the selected variant", async ({
    productPage,
    page,
  }) => {
    // Sage S has 12 in stock
    await productPage.quantityInput.fill("99");
    await productPage.quantityInput.blur();

    await expect(productPage.quantityInput).toHaveValue("12");
    await expect(page.getByRole("button", { name: "Increase quantity" })).toBeDisabled();
  });

  test("Add to Cart updates the header basket badge", async ({ productPage, page }) => {
    await expect(page.getByRole("button", { name: "Basket, 0 items" })).toBeVisible();

    await productPage.addToCart({ variant: "colour-charcoal", quantity: 2 });

    await expect(productPage.addedConfirmation).toHaveText("2");
    await expect(page.getByRole("button", { name: "Basket, 2 items" })).toBeVisible();
    await expect(productPage.addToCartButton).toHaveText("Added");
  });
});
