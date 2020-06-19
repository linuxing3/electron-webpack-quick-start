module.exports = {
  /* your base configuration of choice */
  extends: "eslint:recommended",
  rules: {
    "no-unused-vars": ["off"],
    "no-console": ["off"],
    "no-trailing-spaces": [
      "warn",
      { skipBlankLines: true, ignoreComments: true }
    ]
  },
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 6,
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true
  },
  globals: {
    __static: true
  }
};
