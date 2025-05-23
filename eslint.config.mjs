import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintReact from "eslint-plugin-react";

export default tseslint.config(
  {
    ignores: ["out/**/*", "node_modules/**/*", "temp/**/*"]
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_"
        }
      ]
    }
  },

  {
    ...eslintReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off"
    }
  }
);
