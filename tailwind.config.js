/** @type {import('tailwindcss').Config} */
module.exports = {
  content:[
    "./src/**/*.{html,ts}",
    ],
  theme: {
    extend: {
      boxShadow:{
        'mine':'30px -30px 0px 0px #0F172A, -10px 15px 35px 0px rgba(15, 23, 42, 0.25)'
      },
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

