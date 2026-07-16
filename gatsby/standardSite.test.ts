/* Quick unit checks for the Standard.site document-building logic.
 * Run: npx tsx gatsby/standardSite.test.ts
 * (Pure-function verification — the full gatsby build needs 16GB RAM.) */
import assert from 'assert'
import { rkeyFromSlug, htmlToText, buildRecord, canonical } from './standardSite'

let passed = 0
const check = (name: string, fn: () => void) => {
    try {
        fn()
        passed++
        console.log(`  ✓ ${name}`)
    } catch (err) {
        console.error(`  ✗ ${name}\n    ${(err as Error).message}`)
        process.exitCode = 1
    }
}

console.log('rkeyFromSlug')
check('strips /blog/ prefix', () =>
    assert.equal(rkeyFromSlug('/blog/clickhouse-vs-snowflake'), 'clickhouse-vs-snowflake')
)
check('strips trailing slash', () => assert.equal(rkeyFromSlug('/blog/foo/'), 'foo'))
check('preserves uppercase + digits', () =>
    assert.equal(
        rkeyFromSlug('/blog/posthog-announces-9-million-dollar-series-A'),
        'posthog-announces-9-million-dollar-series-A'
    )
)

console.log('htmlToText')
check('strips tags + collapses whitespace', () =>
    assert.equal(htmlToText('<h1>Hi</h1>\n<p>Hello   <b>world</b></p>'), 'Hi Hello world')
)
check('empty/undefined → empty string', () => {
    assert.equal(htmlToText(undefined), '')
    assert.equal(htmlToText(''), '')
})

console.log('buildRecord')
const full = buildRecord({
    fields: { slug: '/blog/clickhouse-vs-snowflake' },
    excerpt: 'short excerpt',
    html: '<p>Body <em>text</em> here.</p>',
    frontmatter: { title: 'ClickHouse vs Snowflake', date: '2023-02-15', tags: ['Guides', 'ClickHouse'], seo: null },
})!
check('returns a record', () => assert.ok(full))
check('rkey matches filename', () => assert.equal(full.rkey, 'clickhouse-vs-snowflake'))
check('site = publication URI', () =>
    assert.equal(full.record.site, 'at://did:plc:go7eemqz4y5nhonj4kg5w2p6/site.standard.publication/blog')
)
check('$type is document', () => assert.equal(full.record.$type, 'site.standard.document'))
check('path is /<rkey>', () => assert.equal(full.record.path, '/clickhouse-vs-snowflake'))
check('title preserved', () => assert.equal(full.record.title, 'ClickHouse vs Snowflake'))
check('publishedAt is UTC midnight (tz-stable)', () =>
    assert.equal(full.record.publishedAt, '2023-02-15T00:00:00.000Z')
)
check('tags carried through', () => assert.deepEqual(full.record.tags, ['Guides', 'ClickHouse']))
check('description falls back to excerpt', () => assert.equal(full.record.description, 'short excerpt'))
check('textContent derived from html', () => assert.equal(full.record.textContent, 'Body text here.'))

check('seo.metaDescription wins over excerpt', () => {
    const r = buildRecord({
        fields: { slug: '/blog/x' },
        excerpt: 'excerpt',
        frontmatter: { title: 'T', date: '2024-01-01', seo: { metaDescription: 'meta desc' } },
    })!
    assert.equal(r.record.description, 'meta desc')
})
check('missing title/date → null (skipped)', () => {
    assert.equal(buildRecord({ fields: { slug: '/blog/x' }, frontmatter: { date: '2024-01-01' } }), null)
    assert.equal(buildRecord({ fields: { slug: '/blog/x' }, frontmatter: { title: 'T' } }), null)
})
check('no tags → tags omitted', () => {
    const r = buildRecord({ fields: { slug: '/blog/x' }, frontmatter: { title: 'T', date: '2024-01-01' } })!
    assert.equal(r.record.tags, undefined)
})

console.log('canonical (change detection)')
check('key order does not matter', () =>
    assert.equal(canonical({ title: 'a', site: 'b' }), canonical({ site: 'b', title: 'a' }))
)
check('ignores unmanaged fields', () =>
    assert.equal(canonical({ title: 'a', cid: 'x' }), canonical({ title: 'a', cid: 'y' }))
)
check('detects a real change', () => assert.notEqual(canonical({ title: 'a' }), canonical({ title: 'b' })))

console.log(`\n${passed} checks passed${process.exitCode ? ' — WITH FAILURES' : ''}`)
