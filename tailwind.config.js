/**
 * This is a minimal config.
 *
 * If you need the full config, get it from here:
 * https://unpkg.com/browse/tailwindcss@latest/stubs/defaultConfig.stub.js
 * @type {import('tailwindcss').Config}
 */

export default {
  content: [
    /* Process all html files in django apps. */
    '**/templates/**/*.html',
    '**/templates/*.html',
    '**/templates/*.{js,jsx,ts,tsx,vue}',

    /* Ignore any JavaScript in node_modules folder. */
    '!**/node_modules',

    './assets/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

