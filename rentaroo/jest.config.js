module.exports = {
  roots: ["<rootDir>"], // Specify the root directory that Jest should scan for tests and modules within
  testMatch: ["**/*.test.{js,jsx}"],
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["/node_modules/", "\\.png$"],
  testEnvironment: "node", // Specify the test environment as "jsdom"
  setupFilesAfterEnv: ["./src/setupTests.js"], // Set up additional matchers provided by @testing-library/jest-dom
  preset: "@shelf/jest-mongodb",
};
