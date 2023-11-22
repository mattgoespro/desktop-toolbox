/** @type {import('eslint').Linter.BaseConfig} */
module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: "latest",
    sourceType: "module",
    env: {
      node: true,
      es2021: true,
      commonjs: true
    }
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:import/typescript"
  ],
  plugins: ["@typescript-eslint"],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
      webpack: {
        config: "./webpack/config.renderer.dev.ts"
      }
    },
    react: {
      version: "detect"
    }
  },
  ignorePatterns: ["**/build/**/*", "**/node_modules/**/*", "*.d.ts", "dll/"],
  rules: {
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": [
      "warn",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
        ignoreRestSiblings: true
      }
    ],
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "type", "parent", "sibling"],
        warnOnUnassignedImports: true,
        "newlines-between": "never",
        alphabetize: {
          order: "asc",
          orderImportKind: "asc"
        }
      }
    ]
  },
  env: {
    node: true,
    browser: true,
    es2021: true,
    commonjs: true
  }
};
