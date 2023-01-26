/** @type {import('tailwindcss').Config} */
module.exports = {
    purge: {
        content: [
          "./src/**/*.{js,jsx,ts,tsx}",
          "./src/components/**/*.{js,jsx,ts,tsx}",
          "./templates/frontend/index.html",
          "./templates/**/*.html",
        ],
    },
    theme: {
        extend: {},
    },
    plugins: [],
}
