import type { Config } from "jest";
import nextJest from "next/jest.js";

// Loads next.config.ts and .env files, and sets up SWC transforms plus
// mocks for stylesheets, images and next/font.
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/.next/", "<rootDir>/node_modules/", "<rootDir>/tests-pw/"],
};

export default createJestConfig(config);
