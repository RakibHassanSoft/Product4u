/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'nav-default': '#99DDFF', 
        'nav-active': '#3FD2C7',  
        'nav-default-bg': '#fffff',  
        'nav-active-bg': '#3FD2C7',   
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

