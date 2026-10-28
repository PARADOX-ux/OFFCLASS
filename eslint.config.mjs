import nextConfig from "eslint-config-next";

const config = [
  {
    ignores: [
      ".next/**",
      "node_modules/**",
      "out/**",
      "public/**",
      "offclass-app/**",
      "*.zip",
    ],
  },
  ...nextConfig,
  {
    rules: {
      "react-hooks/set-state-in-effect": "off",
      "import/no-anonymous-default-export": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@next/next/no-location-assign-relative-destination": "off",
    },
  },
];

export default config;
