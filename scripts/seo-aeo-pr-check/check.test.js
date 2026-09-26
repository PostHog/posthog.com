const test = require('node:test')
const assert = require('node:assert/strict')
const {
    analyzeFiles,
    analyzeRedirects,
    analyzeVercelConfig,
    contentPathToUrl,
    redirectFor,
    addedH1s,
} = require('./check')

test('maps content files to page URLs', () => {
    assert.equal(contentPathToUrl('contents/docs/product-analytics/index.mdx'), '/docs/product-analytics')
    assert.equal(contentPathToUrl('contents/blog/some-post.md'), '/blog/some-post')
})

test('matches Vercel redirect patterns', () => {
    const redirects = [
        { source: '/docs/old:ext(\\.md)?', destination: '/docs/new:ext?' },
        { source: '/tutorials/:path*', destination: '/docs/:path*' },
        { source: '/host-only', destination: '/', has: [{ type: 'host', value: 'example.com' }] },
    ]
    assert.ok(redirectFor(redirects, '/docs/old'))
    assert.ok(redirectFor(redirects, '/tutorials/a/b'))
    assert.equal(redirectFor(redirects, '/docs/other'), undefined)
    assert.equal(redirectFor(redirects, '/host-only'), undefined)
})

test('flags a deleted page only when no redirect covers it', () => {
    const files = [{ filename: 'contents/docs/gone.mdx', status: 'removed', patch: '' }]
    assert.equal(analyzeFiles(files, [])[0].title, 'Page deleted without a redirect')
    assert.equal(analyzeFiles(files, [{ source: '/docs/gone', destination: '/docs/new' }]).length, 0)
})

test('does not flag a move that keeps the same URL', () => {
    const files = [
        {
            filename: 'contents/docs/thing/index.mdx',
            previous_filename: 'contents/docs/thing.mdx',
            status: 'renamed',
            patch: '',
        },
    ]
    assert.equal(analyzeFiles(files, []).length, 0)
})

test('ignores snippets and ordinary content edits', () => {
    const files = [
        { filename: 'contents/docs/_snippets/install.mdx', status: 'removed', patch: '' },
        {
            filename: 'contents/blog/post.md',
            status: 'modified',
            patch: '@@ -5,1 +5,1 @@\n-Old sentence.\n+New sentence.',
            headContent: '---\ntitle: Post\n---\nNew sentence.',
        },
    ]
    assert.equal(analyzeFiles(files, []).length, 0)
})

test('ignores noindex on a new page', () => {
    const files = [{ filename: 'src/pages/r/ad.tsx', status: 'added', patch: '@@\n+<SEO noindex />' }]
    assert.equal(analyzeFiles(files, []).length, 0)
})

test('flags noindex, removed titles, and a second H1', () => {
    const files = [
        {
            filename: 'src/templates/Doc.tsx',
            status: 'modified',
            patch: '@@\n+<meta name="robots" content="noindex" />',
        },
        {
            filename: 'contents/docs/page.mdx',
            status: 'modified',
            patch: '@@\n-title: Page\n+title: \n+# Another heading\n+```\n+# a shell comment\n+```',
            headContent: '---\ntitle:\n---\n# Another heading',
        },
    ]
    const titles = analyzeFiles(files, []).map((f) => f.title)
    assert.ok(titles.includes('noindex or X-Robots-Tag added'))
    assert.ok(titles.includes('Page title removed'))
    assert.ok(titles.includes('Second H1 on the page'))
    assert.deepEqual(addedH1s(files[1].patch, files[1].headContent), ['# Another heading'])
    assert.deepEqual(addedH1s('@@\n+# or', '---\ntitle: T\n---\n```bash\nnpm i x\n# or\nbun add x\n```'), [])
})

test('flags new redirect chains, temporary redirects, and removed redirects', () => {
    const base = [
        { source: '/a', destination: '/b' },
        { source: '/old', destination: '/new' },
    ]
    const head = [
        { source: '/a', destination: '/b' },
        { source: '/b', destination: '/c' },
        { source: '/x', destination: '/a' },
        { source: '/temp', destination: '/c', statusCode: 302 },
    ]
    const titles = analyzeRedirects(base, head).map((f) => f.title)
    assert.ok(titles.includes('Redirect chain'))
    assert.ok(titles.includes('Temporary redirect'))
    assert.ok(titles.includes('1 redirect removed'))
})

test('flags redirects and links to pages that do not exist', () => {
    const pageUrls = new Set(['/docs/real', '/docs/new'])
    const redirects = [{ source: '/docs/moved', destination: '/docs/new' }]
    const titles = analyzeRedirects([], [{ source: '/docs/gone', destination: '/docs/nowhere' }], pageUrls).map(
        (f) => f.title
    )
    assert.ok(titles.includes('Redirect points to a missing page'))

    const files = [
        {
            filename: 'contents/docs/real.mdx',
            status: 'modified',
            patch: '@@\n+See [a](/docs/nowhere), [b](/docs/moved), [c](/docs/real#x), and [d](/docs/api/foo).',
        },
    ]
    const found = analyzeFiles(files, redirects, { pageUrls }).map((f) => f.title)
    assert.deepEqual(found.sort(), ['1 link through a redirect', '1 link to missing pages'])
})

test('flags title changes and site-wide URL settings', () => {
    const files = [
        {
            filename: 'contents/blog/post.md',
            status: 'modified',
            patch: '@@\n-title: Best analytics tools\n+title: Our favorite tools',
        },
    ]
    assert.deepEqual(
        analyzeFiles(files, []).map((f) => f.title),
        ['Page title changed']
    )
    assert.deepEqual(
        analyzeVercelConfig({ redirects: [] }, { redirects: [], trailingSlash: true }).map((f) => f.severity),
        ['blocker']
    )
})
