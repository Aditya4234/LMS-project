module.exports = {
  // Ensure nesting plugin runs BEFORE Tailwind
  plugins: [
    // optional: if you use @import in your css
    // require('postcss-import'),
    require('tailwindcss/nesting'),
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}
