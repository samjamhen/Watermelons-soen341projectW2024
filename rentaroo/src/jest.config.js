// jest.config.js
module.exports = {
    // Indicates which files should be transformed before running tests
    transform: {
      // Transform TypeScript files using ts-jest
      '^.+\\.tsx?$': 'ts-jest',
      // Transform CSS and SCSS files using css-jest and style-jest
      '^.+\\.css$': 'jest-transform-css',
      '^.+\\.scss$': 'jest-transform-scss',
    },
    // Additional configuration options...
  };
  