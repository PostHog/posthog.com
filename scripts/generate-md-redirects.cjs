#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */

/**
 * Make docs redirects cover their `.md` siblings.
 *
 * Docs `.md` files are separate files from the HTML pages, and vercel.json
 * matches redirects literally — so `/docs/a/b` never covers `/docs/a/b.md`,
 * and moved pages 404 there.
 *
 * Rewrites each literal /docs/ source to accept an optional `.md`, so one rule
 * serves both forms and the route count stays flat (Vercel caps a deployment
 * at 2048 routes, counting every redirect, rewrite and header).
 *
 *   /docs/a/b            ->  /docs/a/b:ext(\.md)?
 *   /docs/x  (dest)      ->  /docs/x:ext?
 *
 * Idempotent. Re-run after adding redirects and commit the result.
 *
 *   node scripts/generate-md-redirects.js          # rewrite vercel.json
 *   node scripts/generate-md-redirects.js --check  # exit 1 if out of date
 */

const fs = require('fs')
const path = require('path')

const VERCEL_JSON = path.join(__dirname, '..', 'vercel.json')

const EXT_SOURCE = ':ext(\\.md)?'
const EXT_DESTINATION = ':ext?'

// Sections where onPostBuild writes a `.md` sibling next to the built HTML.
// A redirect landing anywhere else has no `.md` to point at, so it is left
// alone rather than pointed at a path that doesn't exist.
const MD_SECTIONS = ['/docs/', '/handbook/', '/blog/']

// Safe to rewrite: a literal path with no pattern syntax. Sources containing
// ':' or '*' already match the .md form on their own.
//
// Trailing slashes are excluded deliberately: path-to-regexp reads the param
// as a whole path segment, so `/docs/x/:ext(\.md)?` compiles to
// `^/docs/x(?:/(\.md))?$` — the slash is absorbed into the optional group and
// `/docs/x/` silently stops matching.
const isLiteralPath = (value) =>
    typeof value === 'string' &&
    !value.includes(':') &&
    !value.includes('*') &&
    !value.includes('#') &&
    !value.includes('?') &&
    !value.endsWith('/') &&
    !value.endsWith('.md')

const hasMarkdownSibling = (value) => MD_SECTIONS.some((section) => value.startsWith(section))

function withOptionalMarkdown(redirects) {
    return redirects.map((redirect) => {
        const { source, destination } = redirect
        if (!isLiteralPath(source) || !source.startsWith('/docs/')) return redirect
        if (!isLiteralPath(destination) || !hasMarkdownSibling(destination)) return redirect

        return {
            ...redirect,
            source: `${source}${EXT_SOURCE}`,
            destination: `${destination}${EXT_DESTINATION}`,
        }
    })
}

function main() {
    const check = process.argv.includes('--check')
    const raw = fs.readFileSync(VERCEL_JSON, 'utf8')
    const config = JSON.parse(raw)

    const before = config.redirects.filter((r) => r.source.includes(EXT_SOURCE)).length
    config.redirects = withOptionalMarkdown(config.redirects)
    const after = config.redirects.filter((r) => r.source.includes(EXT_SOURCE)).length

    // Match the file's existing formatting (4-space indent, trailing newline).
    const next = `${JSON.stringify(config, null, 4)}\n`

    if (check) {
        if (next !== raw) {
            console.error(
                `vercel.json has ${after - before} docs redirect(s) that don't cover .md.\n` +
                    'Run: node scripts/generate-md-redirects.js'
            )
            process.exit(1)
        }
        console.log('All docs redirects cover .md.')
        return
    }

    fs.writeFileSync(VERCEL_JSON, next)
    console.log(
        `${after} docs redirect(s) now cover .md (+${after - before}). ` +
            `Routes unchanged: ${config.redirects.length}.`
    )
}

main()
