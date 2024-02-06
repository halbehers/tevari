const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig = {
  transform: {
    "^.+\\.m?tsx?$": ["ts-jest"],
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  testEnvironment: "jest-environment-jsdom",
  setupFiles: ["./jestSetup.js"],
};

module.exports = createJestConfig(customJestConfig);
