import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";


export default defineConfig([
    {
        ignores: ["node_modules/", "dist/", "**/*.min.js"]
    },
    {
        files: ["**/*.{js,mjs,cjs,ts,mts,cts}"],
        plugins: { js },
        extends: ["js/recommended"],
        languageOptions: { globals: globals.browser }
    },
    tseslint.configs.recommended,
    {
        rules: {
            semi: "error",
            "prefer-const": "error",
            "eol-last": ["error", "always"]
        }
    },
]);
