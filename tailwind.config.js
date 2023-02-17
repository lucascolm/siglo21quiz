/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans':['Alliance No.1 Medium Regular',],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
