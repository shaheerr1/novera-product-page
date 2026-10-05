import { resolve } from "path";
import { createBlazeE2E } from "@blaze-cms/plugin-testing-e2e";
import { noveraProfile } from "./profiles/novera";

export const e2e = createBlazeE2E({
  profiles: [noveraProfile],
  defaultSite: "novera",
  // Anchored to the suite so it does not depend on the working directory.
  storeDir: resolve(__dirname, "../playwright/.store"),
});

export const { test, expect, requireFeature } = e2e;
