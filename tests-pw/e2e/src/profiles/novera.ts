import { blazeBaseLocators, deepMerge, type SiteProfile } from "@blaze-cms/plugin-testing-e2e";

/**
 * Novera site profile: maps Novera's markup onto the framework's page objects.
 *
 * Novera is a single product page with no basket page, login, search,
 * registration or checkout, so those feature flags are off and the shared
 * specs that need them skip with a visible reason.
 */
export const noveraProfile: SiteProfile = {
  key: "novera",
  name: "Novera",
  // The production build that playwright.config.ts starts on this port.
  defaultBaseUrl: "http://localhost:3100",
  // deepMerge recurses into each locator spec too, so an override must use the
  // same kind as the baseline entry (css over css, role over role). A role
  // override on a css baseline would keep the baseline's css key, which the
  // resolver checks first, and silently lose.
  locators: deepMerge(blazeBaseLocators, {
    header: {
      root: { css: ".site-header" },
    },
    product: {
      title: { role: "heading", name: "Twill Overshirt", exact: true },
      addToCartButton: { css: ".product-info__add" },
      quantityInput: { css: "#quantity" },
      // Both variant pickers are radio groups with ids colour-<slug> and
      // size-<slug>. The framework builds `#${prefix}${variantKey}`, so an
      // empty prefix lets one key address either: "colour-charcoal", "size-m".
      variantButtonIdPrefix: "",
      // No toasts: a successful add shows the count badge on the header basket.
      addedConfirmation: { css: ".site-header__badge" },
    },
  }),
  routes: {
    home: "/",
    // Swept by the smoke specs alongside the home page.
    extra: ["/api/product"],
  },
  features: {
    search: false,
    // The shared cart specs verify adds on a basket page, which Novera does
    // not have. Novera's own specs cover Add to Cart through the header badge.
    addToCart: false,
    flyoutBasket: false,
    cookieBanner: false,
    registration: false,
    subscriptionSignup: false,
    checkout: "none",
  },
  data: {
    products: [{ path: "/", title: "Twill Overshirt", variant: "colour-charcoal" }],
    registrationValues: {},
  },
};
