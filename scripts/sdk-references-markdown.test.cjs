const assert = require('node:assert/strict')
const { test } = require('node:test')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const {
    materializeSdkReferences,
    publishRawReferences,
    isVersionedReferencePath,
} = require('./sdk-references-markdown.cjs')

const doc = (major, status = 'current') =>
    `---\ntitle: PostHog Python SDK\nsdk: python\nversion: ${major}.0.0\nmajor: ${major}\nstatus: ${status}\n---\n\n## Getting started\n\nInstall.\n\n### Install\n\n## Events\n\n### Capture\n\n\`\`\`python\n## not a heading\n\`\`\`\n`

/** Strapi is the process boundary, so only its HTTP response is faked. */
function strapi(records, status = 200) {
    const calls = []
    const fetchImpl = async (url) => {
        calls.push(url)
        return {
            ok: status === 200,
            status,
            json: async () => ({ data: records.map((attributes) => ({ attributes })) }),
        }
    }
    return { fetchImpl, calls }
}

function site() {
    const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sdkref-'))
    fs.mkdirSync(path.join(dir, 'contents/docs/libraries/python'), { recursive: true })
    fs.writeFileSync(path.join(dir, 'contents/docs/libraries/python/index.mdx'), '---\ntitle: Python\n---\nOld page')
    return dir
}

const migration =
    '---\ntitle: PostHog Python SDK migration guides\nsdk: python\nkind: migration\n---\n\n## Migrating from posthog 7.x to 8.0\n\nUpgrade.\n'

const records = [
    { referenceId: 'posthog-python', version: '7', markdown: doc(7) },
    { referenceId: 'posthog-python', version: '8', markdown: doc(8, 'experimental') },
    { referenceId: 'posthog-python', version: 'migration', markdown: migration },
]

test('only Markdown records are requested from Strapi', async () => {
    const { fetchImpl, calls } = strapi(records)
    await materializeSdkReferences({ apiHost: 'http://127.0.0.1:1338', siteDir: site(), fetchImpl })
    assert.equal(calls.length, 1)
    assert.match(
        decodeURIComponent(calls[0]),
        /^http:\/\/127\.0\.0\.1:1338\/api\/sdk-references\?filters\[markdown\]\[\$notNull\]=true/
    )
})

test('the current major serves the stable reference URL and the hand-written page stays', async () => {
    const dir = site()
    const manifest = await materializeSdkReferences({
        apiHost: 'x',
        siteDir: dir,
        fetchImpl: strapi(records).fetchImpl,
    })
    assert.deepEqual(manifest, [
        {
            sdk: 'python',
            referenceId: 'posthog-python',
            majors: ['8', '7'],
            latest: '7',
            experimental: ['8'],
            migration: true,
        },
    ])
    const index = fs.readFileSync(path.join(dir, 'contents/docs/libraries/python/reference.md'), 'utf8')
    assert.match(
        index,
        /sdkReferenceMajor: "7"\nsdkReferenceMajors: "8,7"\nsdkReferenceLatest: "7"\nsdkReferenceExperimental: "8"\ntableOfContents:/
    )
    assert.doesNotMatch(index, /noindex/)
    assert.match(index, /^contentMaxWidthClass: max-w-full$/m)
    // The hand-written library page stays.
    assert.equal(fs.existsSync(path.join(dir, 'contents/docs/libraries/python/index.mdx')), true)
})

test('explicit majors are noindex and keep their own body', async () => {
    const dir = site()
    await materializeSdkReferences({ apiHost: 'x', siteDir: dir, fetchImpl: strapi(records).fetchImpl })
    const seven = fs.readFileSync(path.join(dir, 'contents/docs/libraries/python/7.md'), 'utf8')
    assert.match(seven, /sdkReferenceMajor: "7"[\s\S]*noindex: true/)
})

test('the ToC lists only H2 headings, ignoring code fences', async () => {
    const dir = site()
    await materializeSdkReferences({ apiHost: 'x', siteDir: dir, fetchImpl: strapi(records).fetchImpl })
    const index = fs.readFileSync(path.join(dir, 'contents/docs/libraries/python/reference.md'), 'utf8')
    const toc = index.match(/tableOfContents:\n([\s\S]*?)\n---/)[1]
    assert.equal(
        toc,
        '  - value: "Getting started"\n    url: getting-started\n    depth: 0\n  - value: "Events"\n    url: events\n    depth: 0'
    )
})

test('raw siblings are the stored bytes, restored after the generic export', async () => {
    const dir = site()
    await materializeSdkReferences({ apiHost: 'x', siteDir: dir, fetchImpl: strapi(records).fetchImpl })
    fs.mkdirSync(path.join(dir, 'public/docs/libraries/python'), { recursive: true })
    fs.writeFileSync(path.join(dir, 'public/docs/libraries/python/reference.md'), 'exported from HTML')
    publishRawReferences(dir)
    assert.equal(fs.readFileSync(path.join(dir, 'public/docs/libraries/python/reference.md'), 'utf8'), doc(7))
    assert.equal(fs.readFileSync(path.join(dir, 'public/docs/libraries/python/7.md'), 'utf8'), doc(7))
})

test('no Markdown in Strapi leaves the hand-written page alone', async () => {
    const dir = site()
    const manifest = await materializeSdkReferences({ apiHost: 'x', siteDir: dir, fetchImpl: strapi([]).fetchImpl })
    assert.deepEqual(manifest, [])
    assert.equal(fs.existsSync(path.join(dir, 'contents/docs/libraries/python/index.mdx')), true)
})

test('a Strapi error fails the build and a mismatched record is rejected', async () => {
    await assert.rejects(
        materializeSdkReferences({ apiHost: 'x', siteDir: site(), fetchImpl: strapi([], 500).fetchImpl }),
        /Strapi returned 500/
    )
    const wrong = [{ referenceId: 'posthog-python', version: '7', markdown: doc(8) }]
    await assert.rejects(
        materializeSdkReferences({ apiHost: 'x', siteDir: site(), fetchImpl: strapi(wrong).fetchImpl }),
        /doesn't match/
    )
})

test('only explicit major pages are versioned paths', () => {
    const manifest = [{ sdk: 'python', majors: ['8', '7'] }]
    assert.equal(isVersionedReferencePath('/docs/libraries/python/7', manifest), true)
    assert.equal(isVersionedReferencePath('/docs/libraries/python/8/', manifest), true)
    assert.equal(isVersionedReferencePath('/docs/libraries/python/reference', manifest), false)
    assert.equal(isVersionedReferencePath('/docs/libraries/node/7', manifest), false)
})

test('migration guides get their own page and raw sibling', async () => {
    const dir = site()
    await materializeSdkReferences({ apiHost: 'x', siteDir: dir, fetchImpl: strapi(records).fetchImpl })
    const page = fs.readFileSync(path.join(dir, 'contents/docs/libraries/python/migration.md'), 'utf8')
    assert.match(
        page,
        /^---\ntitle: "PostHog Python SDK migration guides"\nsidebar: Docs\nshowTitle: true\n---\n\n## Migrating from posthog 7\.x to 8\.0/
    )
    assert.doesNotMatch(
        fs.readFileSync(path.join(dir, 'contents/docs/libraries/python/reference.md'), 'utf8'),
        /sdkReferenceMajors: ".*migration/
    )
    fs.mkdirSync(path.join(dir, 'public/docs/libraries/python'), { recursive: true })
    publishRawReferences(dir)
    assert.equal(fs.readFileSync(path.join(dir, 'public/docs/libraries/python/migration.md'), 'utf8'), migration)
})
