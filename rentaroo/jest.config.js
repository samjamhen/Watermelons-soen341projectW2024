module.exports = {
  roots: ["<rootDir>/src"], // Specify the root directory that Jest should scan for tests and modules within
  transform: {
    "^.+\\.jsx?$": "babel-jest",
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  transformIgnorePatterns: ["/node_modules/", "\\.png$"],
  testEnvironment: "jsdom", // Specify the test environment as "jsdom"
  setupFilesAfterEnv: ["./src/setupTests.js"], // Set up additional matchers provided by @testing-library/jest-dom
};
