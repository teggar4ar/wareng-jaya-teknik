// NOTE: Inert under Tailwind CSS v4 — configuration lives in src/index.css
// (@theme tokens, @custom-variant dark). This file is kept only for editor
// tooling that still looks for it; do not add theme/darkMode keys here.
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
}
