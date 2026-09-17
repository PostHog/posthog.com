import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const { redirects } = JSON.parse(fs.readFileSync(path.join(root, 'vercel.json'), 'utf8'))

const exists = (...segments) => fs.existsSync(path.join(root, ...segments))

// Docs sections whose landing page is a React page in src/pages/docs, so the build writes
// no .md sibling for it. A section with an index.mdx is excluded: onPostBuild already
// turns that into the landing .md.
const reactLandingSections = () => {
    const pagesDir = 'src/pages/docs'
    const slugs = fs
        .readdirSync(path.join(root, pagesDir), { withFileTypes: true })
        .filter((entry) =>
            entry.isDirectory()
                ? exists(pagesDir, entry.name, 'index.tsx')
                : entry.name !== 'index.tsx' && entry.name.endsWith('.tsx')
        )
        .map((entry) => entry.name.replace(/\.tsx$/, ''))

    return slugs.filter(
        (slug) => !exists('contents/docs', slug, 'index.mdx') && exists('contents/docs', slug, 'start-here.mdx')
    )
}

test('each React docs landing page redirects its .md to the section start-here.md', () => {
    for (const slug of reactLandingSections()) {
        const redirect = redirects.find((r) => r.source === `/docs/${slug}.md`)
        assert.ok(redirect, `no /docs/${slug}.md redirect — agents that request it get a 404`)
        assert.equal(redirect.destination, `/docs/${slug}/start-here.md`)
    }
})

test('the HTML landing pages keep serving their own page', () => {
    for (const slug of reactLandingSections()) {
        const redirect = redirects.find((r) => r.source === `/docs/${slug}` || r.source === `/docs/${slug}:ext(\\.md)?`)
        assert.equal(redirect, undefined, `/docs/${slug} must render the landing page, not redirect`)
    }
})
