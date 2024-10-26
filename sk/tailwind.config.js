/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
         './node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}',
    './node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}'
    ],
  theme: {
    extend: {
        fontFamily: {
            custom: ['Poppins', 'sans-serif'], // Use the name you defined in @font-face
          },

    },
  },
  plugins: [],
}

