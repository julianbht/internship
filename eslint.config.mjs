import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  {
    ignores: [
      ".next/",
      "node_modules/",
      "tailwind.config.ts",
      "**/components/ui/*",
    ],
  },
  ...compat.extends(
      "next/core-web-vitals",
      "next/typescript",
      "standard",
      "prettier",
  ),
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
      "no-use-before-define": "off",
      "no-unused-vars": "off",
      "no-multi-str": "off",
      "ban-ts-comment": "off",
      "@typescript-eslint/ban-ts-comment": "off", // make Google Firebase build
      "@typescript-eslint/ban-ts-ignore": "off" // make Google Firebase build
    },
  },
];
export default eslintConfig;