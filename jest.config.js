/*eslint-disable */
export default {
  testMatch: [
    "**/__tests__/**/*.[jt]s?(x)",
    "**/?(*.)+(spec|test).[tj]s?(x)"
  ],

    coverageReporters: [
     "json",
     "text",
     "lcov",
     "clover"
  ],
    coverageDirectory: "coverage",
    
      collectCoverageFrom: [
    "src/**/*.{js,jsx,ts,tsx}",  // Target files in the src folder
    "!src/**/index.js",         // Optionally exclude specific files (e.g., index.js)
    "!**/node_modules/**",       // Exclude node_modules

    "!**/vendor/**",             // Exclude vendor files
  ],

   collectCoverage: true,

 clearMocks: true,
}