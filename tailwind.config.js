/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
       fontFamily:{
        'inter':['Inter']
       },
      colors:{
        'vendblocblue':'#0F172A',
        'vendblocgrey':'#0F172A33',
        'vendblocyen':'#81036733'
      }
    },
  },
  plugins: [],
}

