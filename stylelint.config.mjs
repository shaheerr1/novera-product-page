// BEM: block, block__element, block--modifier, block__element--modifier,
// each part lowercase kebab-case.
const BEM_PATTERN =
  /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?:__[a-z0-9]+(?:-[a-z0-9]+)*)?(?:--[a-z0-9]+(?:-[a-z0-9]+)*)?$/;

/** @type {import("stylelint").Config} */
const config = {
  extends: ["stylelint-config-standard-scss"],
  ignoreFiles: [".next/**", "out/**", "build/**", "coverage/**", "node_modules/**"],
  rules: {
    "selector-class-pattern": [
      BEM_PATTERN,
      {
        resolveNestedSelectors: true,
        message: (selector) =>
          `Expected class "${selector}" to follow BEM (block__element--modifier, lowercase kebab-case)`,
      },
    ],
  },
};

export default config;
