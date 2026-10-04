#!/usr/bin/env node
// Adds `?url` to default imports of image files (`import logo from './logo.svg'`). Webpack gave
// those a URL string; Astro gives image imports an ImageMetadata object (`{ src, width, height }`),
// so `<img src={logo} />` rendered "[object Object]". `?url` is Vite's suffix for "the URL string".
// Usage: node scripts/astro-migration/codemod-image-url-imports.mjs [glob...]
import fg from 'fast-glob'
import fs from 'node:fs'

const IMPORT = /^(import\s+[\w$]+\s+from\s+)(['"])([^'"]+\.(?:png|jpe?g|gif|webp|svg|avif))\2/gm
const patterns = process.argv.slice(2)
const files = fg.sync(patterns.length ? patterns : ['src/**/*.{ts,tsx,js,jsx}'])

let changed = 0
for (const file of files) {
    const source = fs.readFileSync(file, 'utf8')
    const result = source.replace(IMPORT, (_, start, quote, specifier) => `${start}${quote}${specifier}?url${quote}`)
    if (result === source) continue
    fs.writeFileSync(file, result)
    changed++
}
console.log(`image url imports: rewrote ${changed} files`)
