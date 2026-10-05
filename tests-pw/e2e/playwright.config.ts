import { resolve } from "path";
import { defineConfig } from "@playwright/test";
import { blazeConfig } from "@blaze-cms/plugin-testing-e2e";
import { e2e } from "./src/e2e";

const PORT = 3100;
const repoRoot = resolve(__dirname, "../..");

export default defineConfig(
  blazeConfig(e2e, {
    globalSetup: require.resolve("./global-setup"),
    // Test the production build, not the dev server. Skipped when
    // BLAZE_TEST_PLAYWRIGHT_BASE_URL points the suite at a deployed site.
    webServer: e2e.env.baseUrl
      ? undefined
      : {
          command: `npm run build && npm run start -- --port ${PORT}`,
          cwd: repoRoot,
          url: `http://localhost:${PORT}`,
          reuseExistingServer: false,
          timeout: 180_000,
          stdout: "ignore",
          stderr: "pipe",
        },
  }),
);
