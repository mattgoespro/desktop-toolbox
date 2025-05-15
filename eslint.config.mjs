import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {},
  {
    files: ["**/*.{ts,tsx,js,mjs,}"],
    plugins: { js },
    extends: ["js/recommended"],
    ignores: ["**/node_modules/**"]
  },
  tseslint.configs.recommended,
  {
    rules: {
      "eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ]
    },
    languageOptions: { globals: globals.browser }
  },
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: "detect"
      }
    },
    rules: {
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    }
  }
]);
