#!/usr/bin/env node
// Lists packages that the site default-imports and that are CommonJS with `exports.__esModule`.
// Node hands their default import the whole exports object, so server rendering gets an object
// instead of a component. A package with an ES module build (`module` in its package.json) belongs
// in SSR_BUNDLED in astro.config.mjs. A CommonJS-only package must be replaced: this package is
// `"type": "module"`, so Vite 8 gives its files Node's interop in every build, the browser included.
// The browser build also prefers a package's `browser` field, which can point at a CommonJS or UMD
// file even when the package has an ES module build; those are reported too.
// Usage: node scripts/astro-migration/check-cjs-defaults.mjs
import fg from 'fast-glob'
import fs from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'

const require = createRequire(path.join(process.cwd(), 'package.json'))

const LOCAL = /^(\.|~|components|hooks|lib|types|images|constants|logic|docs|onboarding|@data)\b/
const config = fs.readFileSync('astro.config.mjs', 'utf8')
const bundled = new Set([...config.matchAll(/^\s+"([^"]+)",$/gm)].map((m) => m[1]))

const specifiers = new Map()
const dynamicOnly = new Map()
for (const file of fg.sync(['src/**/*.{ts,tsx,js,jsx}'])) {
    const source = fs.readFileSync(file, 'utf8')
    for (const m of source.matchAll(/^\s*import\s+[\w$]+\s*(?:,\s*\{[^}]*\})?\s*from\s*['"]([^'"]+)['"]/gm)) {
        if (!LOCAL.test(m[1]) && !specifiers.has(m[1])) specifiers.set(m[1], file)
    }
    // Dynamic imports load on demand in the browser, so only the `browser` build check applies.
    for (const m of source.matchAll(/\bimport\(\s*['"]([^'"]+)['"]\s*\)/g)) {
        if (!LOCAL.test(m[1]) && !specifiers.has(m[1])) dynamicOnly.set(m[1], file)
    }
}

let missing = 0
for (const [specifier, file] of [
    ...specifiers,
    ...[...dynamicOnly].filter(([specifier]) => !specifiers.has(specifier)),
]) {
    const name = specifier.startsWith('@') ? specifier.split('/').slice(0, 2).join('/') : specifier.split('/')[0]
    let manifest
    try {
        manifest = require(`${name}/package.json`)
    } catch {
        continue
    }
    // The file the browser build loads when the package names one in `browser`.
    if (specifier === name && typeof manifest.browser === 'string') {
        const browserFile = path.join(path.dirname(require.resolve(`${name}/package.json`)), manifest.browser)
        const source = fs.existsSync(browserFile) ? fs.readFileSync(browserFile, 'utf8') : ''
        if (/__esModule/.test(source) && /exports\.default|exports\['default'\]|exports\["default"\]/.test(source)) {
            missing++
            console.log(
                `${name} (imported by ${file}) loads a CommonJS/UMD \`browser\` build in the browser: replace it`
            )
            continue
        }
    }
    if (!specifiers.has(specifier)) continue
    let module
    try {
        module = await import(specifier)
    } catch {
        continue
    }
    const value = module.default
    if (!value || typeof value !== 'object' || !value.__esModule || !('default' in value)) continue
    const esm = Boolean(manifest.module)
    if (esm && bundled.has(name)) continue
    missing++
    console.log(
        esm
            ? `${name} (imported by ${file}) is not in SSR_BUNDLED`
            : `${name} (imported by ${file}) is CommonJS-only: replace it`
    )
}
console.log(`\n${missing} packages to fix`)
process.exitCode = missing ? 1 : 0
