/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      container:{
        center:true,
        padding:{
          default:"1rem",
          sm:"2rem",
          md:"3rem",
          lg:"4rem"
        }
      },
      fontFamily: {
        merienda: ["Merienda", 'cursive'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
}

