const fs = require('fs')
const path = require('path')
const postcss = require('postcss')
const tailwind = require('@tailwindcss/postcss')
const autoprefixer = require('autoprefixer')

async function build() {
  try {
    const inputPath = path.resolve(__dirname, '../src/input.css')
    const outDir = path.resolve(__dirname, '../dist')
    const outPath = path.join(outDir, 'output.css')

    const input = fs.readFileSync(inputPath, 'utf8')
    const result = await postcss([tailwind(), autoprefixer()]).process(input, { from: inputPath })

    fs.mkdirSync(outDir, { recursive: true })
    fs.writeFileSync(outPath, result.css)
    console.log('Wrote', outPath)
  } catch (err) {
    console.error(err)
    process.exit(1)
  }
}

build()
