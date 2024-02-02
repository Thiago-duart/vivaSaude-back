import type { Config } from "jest";

export const config: Config = {
  collectCoverage: true,
  coverageDirectory: "coverage",
  preset: "@shelf/jest-mongodb",
  coverageProvider: "v8",
};

export default config;
