// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // ✅ this line is essential
  ],
  theme: {
    extend: {
      colors:{
       'primary':'#5f6fff'
      },
      gridTemplate:{
        'auto':'repeat(auto-fill, minmax(200px, 1fr))'
      }
    },
  },
  plugins: [],
};



