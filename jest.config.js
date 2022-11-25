const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",

    "^@/public/(.*)$": "<rootDir>/public/$1",
  },
  setupFilesAfterEnv: ["./jest.setup.js"],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    "./src/(components|pages.test)/**/*.test.{js,jsx,ts,tsx}",
    "!./src/**/_*.{js,jsx,ts,tsx}",
    "!./src/**/*.stories.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: -10,
    },
  },
  testEnvironment: "jest-environment-jsdom",
  coverageDirectory: "./coverage",
};

module.exports = createJestConfig(customJestConfig);
