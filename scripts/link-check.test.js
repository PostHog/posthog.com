/* eslint-disable @typescript-eslint/no-var-requires */

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { spawnSync } = require('child_process')
const { extractLinks, resolveUrl, importingPages, changedFiles } = require('./link-check-utils')
const { processLink, extractAnchorsFromHtml } = require('./check-links-post-build')
const sourceChecker = require('./check-src-links')
const cli = path.resolve(__dirname, 'check-links-post-build.js')

function fixture(t) {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'link-check-'))
    t.after(() => fs.rmSync(directory, { recursive: true, force: true }))
    return (name, content) => {
        const file = path.join(directory, name)
        fs.mkdirSync(path.dirname(file), { recursive: true })
        fs.writeFileSync(file, content)
        return file
    }
}

test('extracts public PostHog links while excluding examples and third-party sites', (t) => {
    const write = fixture(t)
    const file = write(
        'guide.mdx',
        [
            '---',
            'title: "[frontmatter](/ignored)"',
            '---',
            '[same page](#missing)',
            '[absolute](https://posthog.com/docs/page?tab=Node.js#missing)',
            '<a href="/docs/html#section">HTML</a>',
            '',
            '[reference][target]',
            '',
            '[target]: /docs/reference',
            '',
            '[parentheses](/docs/with-(parentheses))',
            '[external](https://example.com/404)',
            '[app](https://app.posthog.com/settings)',
            '[lookalike](https://posthog.com.example.com/docs)',
            '```md',
            '[example](/ignored-code)',
            '```',
            '`[inline](/ignored-inline)`',
            '<!-- [comment](/ignored-comment) -->',
        ].join('\n')
    )
    const links = extractLinks(file)
    assert.deepEqual(
        links.map((link) => link.url),
        [
            '#missing',
            'https://posthog.com/docs/page?tab=Node.js#missing',
            '/docs/html#section',
            '/docs/reference',
            '/docs/with-(parentheses)',
        ]
    )
    assert.equal(links[0].line, 4)
    assert.equal(links[2].line, 6)
})

test('redirect matching uses complete paths and follows targets', () => {
    const redirects = [{ source: '/old', destination: '/new' }]
    assert.equal(resolveUrl('/old-extra', null, redirects).redirected, false)
    assert.equal(resolveUrl('/old/child', null, redirects).redirected, false)
    assert.equal(resolveUrl('/old#missing', null, redirects).url.href, 'https://posthog.com/new#missing')
    assert.equal(resolveUrl('/old?tab=Node.js#missing', null, redirects).url.hash, '#missing')
    assert.equal(resolveUrl('/old?tab=Node.js#missing', null, redirects).url.search, '?tab=Node.js')
    assert.equal(
        resolveUrl('/old', null, [...redirects, { source: '/new', destination: '/old' }]).error,
        'Redirect loop'
    )
    assert.equal(resolveUrl('/old', null, [{ source: '/old', destination: 'https://example.com' }]).excluded, true)
    assert.equal(
        resolveUrl('/old', null, [{ source: '/old', destination: '/new', has: [{ type: 'host' }] }]).redirected,
        false
    )
})

test('resolves Vercel wildcards, optional Markdown extensions, and destination fragments', () => {
    const redirects = [
        { source: '/old/:path*', destination: '/new/:path*' },
        { source: '/guide:ext(\\\\.md)?', destination: '/docs/guide:ext?' },
        { source: '/fragment', destination: '/docs/guide#replacement' },
    ]
    assert.equal(resolveUrl('/old/a/b#section', null, redirects).url.pathname, '/new/a/b')
    assert.equal(resolveUrl('/guide.md', null, redirects).url.pathname, '/docs/guide.md')
    assert.equal(resolveUrl('/guide', null, redirects).url.pathname, '/docs/guide')
    assert.equal(resolveUrl('/fragment#old', null, redirects).url.hash, '#replacement')
})

test('validates query-selected and redirected anchors against actual IDs', (t) => {
    const write = fixture(t)
    const previous = process.cwd()
    const html = write('public/docs/guide/index.html', '<h2 id="actual">Different heading slug</h2><a id="café"></a>')
    process.chdir(path.dirname(path.dirname(path.dirname(path.dirname(html)))))
    t.after(() => process.chdir(previous))
    const pages = ['/docs/guide']
    const check = (url, redirects = []) =>
        processLink({ url, page: '/docs/guide' }, 'contents/docs/guide.mdx', pages, redirects).type
    assert.equal(check('#actual'), 'valid')
    assert.equal(check('#missing'), 'broken_anchor')
    assert.equal(check('/docs/guide?tab=Node.js#missing'), 'broken_anchor')
    assert.equal(check('/docs/guide#caf%C3%A9'), 'valid')
    assert.equal(check('/docs/guide#bad%'), 'broken_anchor')
    assert.equal(check('/old#missing', [{ source: '/old', destination: '/docs/guide' }]), 'broken_anchor')
    assert.equal(check('/old', [{ source: '/old', destination: '/not-a-page' }]), 'broken')
    assert.equal(extractAnchorsFromHtml(html).has('different-heading-slug'), false)
})

test('resolves a shared snippet to its importing pages', (t) => {
    const write = fixture(t)
    const snippet = write('contents/docs/_snippets/shared.mdx', '[section](#here)')
    const first = write('contents/docs/first.mdx', 'import Shared from "./_snippets/shared.mdx"')
    const second = write('contents/docs/second.mdx', 'import Shared from "./\\_snippets/shared.mdx"')
    const previous = process.cwd()
    process.chdir(path.resolve(first, '../../..'))
    t.after(() => process.chdir(previous))
    assert.deepEqual(importingPages([snippet, first, second])(snippet).sort(), ['/docs/first', '/docs/second'])
})

test('CLI fails on anchor-only findings and writes usable reports', (t) => {
    const write = fixture(t)
    const file = write('contents/docs/guide.mdx', '[missing](#missing)')
    write('public/docs/guide/index.html', '<h1 id="exists">Guide</h1>')
    write('public/sitemap/sitemap-0.xml', '<urlset><url><loc>https://posthog.com/docs/guide</loc></url></urlset>')
    write('vercel.json', '{}')
    const cwd = path.resolve(file, '../../..')
    const result = spawnSync(process.execPath, [cli, 'results'], { cwd, encoding: 'utf8' })
    assert.equal(result.status, 1, result.stdout + result.stderr)
    const report = JSON.parse(fs.readFileSync(path.join(cwd, 'results/link-check.json'), 'utf8'))
    assert.equal(report.summary.brokenLinks, 0)
    assert.equal(report.summary.brokenAnchors, 1)
    assert.equal(report.brokenAnchors[0].line, 1)
    assert.equal(report.brokenAnchors[0].brokenUrl, 'https://posthog.com/docs/guide#missing')
    const error = spawnSync(process.execPath, [cli], { cwd: path.dirname(cwd), encoding: 'utf8' })
    assert.equal(error.status, 2)
})

test('source checker handles absolute URLs and broken redirect targets', (t) => {
    const write = fixture(t)
    const file = write(
        'component.tsx',
        '<a href="https://posthog.com/old">Old</a>\n<a href="https://third.party/404">External</a>'
    )
    const result = sourceChecker.checkLinks(new Set(['/new']), [{ source: '/old', destination: '/new' }], [file])
    assert.equal(result.brokenByUrl.size, 0)
    assert.equal(result.stats.excludedLinks, 1)
    assert.equal(
        sourceChecker.checkLinks(new Set(), [{ source: '/old', destination: '/missing' }], [file]).brokenByUrl.size,
        1
    )
})

test('rejects an invalid changed-files revision', () => {
    assert.throws(() => changedFiles([], '--all'), /full commit SHA/)
})

test('reads every sitemap shard and handles dotted page paths', (t) => {
    const write = fixture(t)
    const file = write('contents/docs/version-1.2.mdx', '[section](#ok)\n[other](/docs/other)')
    write('public/docs/version-1.2/index.html', '<h1 id="ok">Version</h1>')
    write('public/docs/other/index.html', '<h1>Other</h1>')
    write('public/sitemap/sitemap-0.xml', '<urlset><url><loc>https://posthog.com/docs/version-1.2</loc></url></urlset>')
    write('public/sitemap/sitemap-1.xml', '<urlset><url><loc>https://posthog.com/docs/other</loc></url></urlset>')
    write('vercel.json', '{}')
    const cwd = path.resolve(file, '../../..')
    const result = spawnSync(process.execPath, [cli, 'results'], { cwd, encoding: 'utf8' })
    assert.equal(result.status, 0, result.stdout + result.stderr)
    const report = JSON.parse(fs.readFileSync(path.join(cwd, 'results/link-check.json'), 'utf8'))
    assert.equal(report.summary.pagesInSitemap, 2)
    assert.equal(report.summary.totalLinks, 2)
})

test('source parser includes JSX expressions and multiline links but skips dynamic expressions and comments', (t) => {
    const write = fixture(t)
    const file = write(
        'component.tsx',
        [
            'const options = { url: "/docs/options" };',
            'const view = <Link href={',
            '  "/docs/multiline"',
            '} to={`/docs/template`}/>;',
            '// <Link href="/docs/comment"/>',
            'const dynamic = <Link href={`/docs/${slug}`}/>;',
        ].join('\n')
    )
    const links = sourceChecker.extractLinks(file)
    assert.deepEqual(
        links.map((link) => link.url),
        ['/docs/options', '/docs/multiline', '/docs/template']
    )
    assert.equal(links[1].line, 3)
})

test('includes literal MDX component link props without treating dynamic expressions as links', (t) => {
    const write = fixture(t)
    const file = write(
        'page.mdx',
        '<Link to="/docs/component" />\n<Button href={"/docs/expression"} />\n<Link to={"/docs/" + slug} />'
    )
    assert.deepEqual(
        extractLinks(file).map((link) => link.url),
        ['/docs/component', '/docs/expression']
    )
})

test('fallback rewrites do not loop or override generated files', () => {
    const rewrites = [{ source: '/dynamic/:path*', destination: '/dynamic/[slug]/index.html', rewrite: true }]
    const target = resolveUrl('/dynamic/example#section', null, rewrites)
    assert.equal(target.url.pathname, '/dynamic/[slug]/index.html')
    assert.equal(target.url.hash, '#section')
    assert.equal(target.error, undefined)
    const fallback = [{ source: '/:path(.*)\\.md', destination: '/api/md-not-found', rewrite: true }]
    assert.equal(resolveUrl('/docs/page.md', null, fallback, () => true).url.pathname, '/docs/page.md')
    assert.equal(resolveUrl('/docs/page.md', null, fallback).url.pathname, '/api/md-not-found')
})
