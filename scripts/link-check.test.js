/* eslint-disable @typescript-eslint/no-var-requires */

const test = require('node:test')
const assert = require('node:assert/strict')
const fs = require('fs')
const os = require('os')
const path = require('path')
const { spawnSync, execFileSync } = require('child_process')
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

test('browser text directives do not become element IDs', (t) => {
    const write = fixture(t)
    const file = write('public/docs/guide/index.html', '<h1 id="actual">Guide</h1>')
    const previous = process.cwd()
    process.chdir(path.resolve(file, '../../../..'))
    t.after(() => process.chdir(previous))
    const check = (url) => processLink({ url }, 'contents/docs/guide.md', ['/docs/guide'], []).type
    assert.equal(check('/docs/guide#:~:text=Guide'), 'valid')
    assert.equal(check('/docs/guide#actual:~:text=Guide'), 'valid')
    assert.equal(check('/docs/guide#missing:~:text=Guide'), 'broken_anchor')
    assert.equal(check('/docs/guide#actual#invented'), 'broken_anchor')
    assert.equal(check('/docs/guide#top'), 'valid')
    assert.equal(check('/missing#:~:text=Guide'), 'broken')
})

test('non-page skill instructions are excluded while imported snippets are checked', (t) => {
    const write = fixture(t)
    const skill = write('contents/learn/test/SKILL.md', '[Local file](references/method.md)')
    const snippet = write('contents/docs/_snippets/shared.mdx', '[Missing](#missing)')
    const page = write('contents/docs/guide.mdx', 'import Shared from "./_snippets/shared.mdx"\n\n<Shared />')
    write('public/docs/guide/index.html', '<h1 id="actual">Guide</h1>')
    write('public/sitemap/sitemap-0.xml', '<urlset><url><loc>https://posthog.com/docs/guide</loc></url></urlset>')
    write('vercel.json', '{}')
    const cwd = path.resolve(page, '../../..')
    const previous = process.cwd()
    process.chdir(cwd)
    t.after(() => process.chdir(previous))
    assert.deepEqual(importingPages([skill, snippet, page])(skill), [])
    const result = spawnSync(process.execPath, [cli, 'results'], { cwd, encoding: 'utf8' })
    assert.equal(result.status, 1, result.stdout + result.stderr)
    const report = JSON.parse(fs.readFileSync(path.join(cwd, 'results/link-check.json'), 'utf8'))
    assert.equal(report.summary.markdownFiles, 2)
    assert.equal(report.summary.brokenLinks, 0)
    assert.equal(report.summary.brokenAnchors, 1)
    assert.equal(report.brokenAnchors[0].page, 'https://posthog.com/docs/guide')
})

test('source links validate explicit destination anchors after redirects', (t) => {
    const write = fixture(t)
    const file = write(
        'src/component.tsx',
        [
            '<a href="/docs/guide#actual" />',
            '<a href="https://posthog.com/docs/guide#missing" />',
            '<a href="/old#missing" />',
            '<a href="/docs/guide#:~:text=Guide" />',
            '<a href="#local" />',
        ].join('\n')
    )
    write('public/docs/guide/index.html', '<h1 id="actual">Guide</h1>')
    const previous = process.cwd()
    process.chdir(path.resolve(file, '../..'))
    t.after(() => process.chdir(previous))
    const result = sourceChecker.checkLinks(
        new Set(['/docs/guide']),
        [{ source: '/old', destination: '/docs/guide' }],
        [file]
    )
    assert.deepEqual([...result.brokenByUrl.keys()], ['/docs/guide#missing', '/old#missing'])
    assert.equal(result.stats.totalLinks, 4)
})

test('source scans exclude test files and fixtures while retaining production links', (t) => {
    const write = fixture(t)
    const production = write('src/components/Link.tsx', '<a href="/missing-production-page" />')
    write('src/components/Link.test.tsx', '<a href="/test-only" />')
    write('src/components/Link.spec.js', '<a href="/spec-only" />')
    write('src/__tests__/link.tsx', '<a href="/test-folder-only" />')
    write('src/components/__fixtures__/link.tsx', '<a href="/fixture-only" />')
    write('src/components/fixtures/link.tsx', '<a href="/fixture-only" />')
    const files = sourceChecker.findSourceFiles(path.resolve(production, '../../..'))
    assert.deepEqual(files, [production])
    const result = sourceChecker.checkLinks(new Set(), [], files)
    assert.deepEqual([...result.brokenByUrl.keys()], ['/missing-production-page'])
})

test('checker-only changes scan all files while content-only changes stay scoped', (t) => {
    const write = fixture(t)
    const marker = write('marker', '')
    const cwd = path.dirname(marker)
    const git = (args, options = {}) => execFileSync('git', args, { cwd, encoding: 'utf8', ...options }).trim()
    git(['init', '--quiet'])
    const commit = (mark, parent, name, content) =>
        [
            'commit refs/heads/main',
            `mark :${mark}`,
            'committer Test <test@example.com> 1234567890 +0000',
            'data 4',
            'test',
            ...(parent ? [`from :${parent}`] : []),
            `M 100644 inline ${name}`,
            `data ${Buffer.byteLength(content)}`,
            content,
            '',
        ].join('\n')
    git(['fast-import', '--quiet'], {
        input:
            commit(1, null, 'contents/docs/guide.md', 'Guide') +
            commit(2, 1, 'scripts/link-check-utils.js', 'Checker') +
            commit(3, 2, 'contents/docs/guide.md', 'Updated guide'),
    })
    git(['symbolic-ref', 'HEAD', 'refs/heads/main'])
    const initial = git(['rev-parse', 'HEAD~2'])
    const checker = git(['rev-parse', 'HEAD~1'])
    const previous = process.cwd()
    process.chdir(cwd)
    t.after(() => process.chdir(previous))
    const files = ['contents/docs/guide.md', 'contents/docs/other.md']
    assert.deepEqual(changedFiles(files, checker), ['contents/docs/guide.md'])
    git(['update-ref', 'refs/heads/main', checker])
    assert.deepEqual(changedFiles(files, initial), files)
})

test('workflow base selection uses the merge parent when the webhook SHA is stale', (t) => {
    const write = fixture(t)
    const directory = path.dirname(write('marker', ''))
    const git = (cwd, args, options = {}) => execFileSync('git', args, { cwd, encoding: 'utf8', ...options }).trim()
    const origin = path.join(directory, 'origin')
    fs.mkdirSync(origin)
    git(origin, ['init', '--quiet'])
    git(origin, ['fast-import', '--quiet'], {
        input: [
            'commit refs/heads/master',
            'mark :1',
            'committer Test <test@example.com> 1234567890 +0000',
            'data 4',
            'test',
            'M 100644 inline page',
            'data 3',
            'old',
            '',
            'commit refs/heads/feature',
            'mark :2',
            'committer Test <test@example.com> 1234567891 +0000',
            'data 4',
            'test',
            'from :1',
            'M 100644 inline feature',
            'data 3',
            'new',
            '',
            'commit refs/heads/master',
            'mark :3',
            'committer Test <test@example.com> 1234567892 +0000',
            'data 4',
            'test',
            'from :1',
            'M 100644 inline page',
            'data 7',
            'current',
            '',
            'commit refs/heads/pr-merge',
            'committer Test <test@example.com> 1234567893 +0000',
            'data 4',
            'test',
            'from :3',
            'merge :2',
            'M 100644 inline feature',
            'data 3',
            'new',
            '',
        ].join('\n'),
    })
    const stale = git(origin, ['rev-parse', 'master~1'])
    const expected = git(origin, ['rev-parse', 'master'])
    const checkout = path.join(directory, 'checkout')
    git(directory, ['clone', '--quiet', '--no-local', '--depth=2', '--branch=pr-merge', origin, checkout])
    const workflow = fs.readFileSync(path.join(__dirname, '../.github/workflows/internal-links-check.yml'), 'utf8')
    const block = workflow.match(/- name: Fetch PR base commit\n[\s\S]*? {14}run: \|\n((?: {18}[^\n]*\n)+)/)[1]
    const script = block
        .split('\n')
        .map((line) => line.slice(18))
        .join('\n')
    const output = path.join(directory, 'github-env')
    const run = spawnSync('bash', ['-e'], {
        cwd: checkout,
        input: script,
        encoding: 'utf8',
        env: { ...process.env, BASE_SHA: stale, GITHUB_ENV: output },
    })
    assert.equal(run.status, 0, run.stdout + run.stderr)
    assert.equal(fs.readFileSync(output, 'utf8').trim(), `BASE_SHA=${expected}`)
    assert.notEqual(expected, stale)
})
