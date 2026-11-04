// Turns the SDK reference Markdown stored in Strapi into ordinary docs pages.
//
// An SDK with Markdown records gets /docs/libraries/<sdk> for its newest major, an explicit
// noindex page per major, and raw .md siblings that are byte-for-byte the stored Markdown.
// SDKs without records keep their HogRef pages. The site stores no rollout state: whatever
// Strapi holds is what gets built.
const fs = require('node:fs')
const path = require('node:path')
const Slugger = require('github-slugger')

const MANIFEST = '.cache/sdk-references-markdown.json'

async function fetchMarkdownReferences(apiHost, fetchImpl = fetch) {
    const params = new URLSearchParams({
        'filters[markdown][$notNull]': 'true',
        'fields[0]': 'referenceId',
        'fields[1]': 'version',
        'fields[2]': 'markdown',
        'pagination[pageSize]': '100',
    })
    const res = await fetchImpl(`${apiHost}/api/sdk-references?${params}`)
    if (!res.ok) throw new Error(`Strapi returned ${res.status} for SDK reference Markdown`)
    const { data } = await res.json()
    return (data ?? []).map(({ attributes }) => attributes)
}

function frontMatter(markdown) {
    const match = markdown.match(/^---\n([\s\S]*?)\n---\n/)
    if (!match) throw new Error('SDK reference Markdown has no front matter')
    const meta = Object.fromEntries(
        match[1].split('\n').map((l) => [l.slice(0, l.indexOf(':')), l.slice(l.indexOf(':') + 1).trim()])
    )
    return { meta, body: markdown.slice(match[0].length) }
}

/** The page's H2 headings, which are the only ToC entries: feature areas plus structure. */
function tableOfContents(body) {
    const slugger = new Slugger()
    let inFence = false
    const toc = []
    for (const line of body.split('\n')) {
        if (/^\s*```/.test(line)) inFence = !inFence
        const heading = !inFence && line.match(/^(#{2,6}) (.+)$/)
        if (!heading) continue
        const url = slugger.slug(heading[2])
        if (heading[1] === '##') toc.push({ value: heading[2], url, depth: 0 })
    }
    return toc
}

function page({ meta, body }, { sdk, major, majors, latest, experimental, noindex }) {
    const toc = tableOfContents(body)
        .map((t) => `  - value: ${JSON.stringify(t.value)}\n    url: ${t.url}\n    depth: 0`)
        .join('\n')
    return [
        '---',
        `title: ${JSON.stringify(meta.title)}`,
        'sidebar: Docs',
        'showTitle: true',
        // References are dense, so they use the full content width by default.
        'contentMaxWidthClass: max-w-full',
        `platformLogo: ${sdk}`,
        `sdkReferenceSdk: ${sdk}`,
        `sdkReferenceMajor: "${major}"`,
        `sdkReferenceMajors: "${majors.join(',')}"`,
        `sdkReferenceLatest: "${latest}"`,
        `sdkReferenceExperimental: "${experimental.join(',')}"`,
        ...(noindex ? ['noindex: true'] : []),
        'tableOfContents:',
        toc,
        '---',
        '',
        body,
    ].join('\n')
}

function writeFile(destination, content) {
    fs.mkdirSync(path.dirname(destination), { recursive: true })
    fs.writeFileSync(`${destination}.tmp`, content)
    fs.renameSync(`${destination}.tmp`, destination)
}

/** Fetches every Markdown reference from Strapi and writes the docs inputs. Returns the build manifest. */
async function materializeSdkReferences({ apiHost, siteDir = process.cwd(), fetchImpl } = {}) {
    const records = await fetchMarkdownReferences(apiHost, fetchImpl)
    const bySdk = new Map()
    const migrations = new Map()
    for (const record of records) {
        const parsed = frontMatter(record.markdown)
        const sdk = parsed.meta.sdk
        const isMigration = record.version === 'migration'
        const matches = isMigration ? parsed.meta.kind === 'migration' : String(parsed.meta.major) === record.version
        if (!/^[a-z0-9-]+$/.test(sdk || '') || !matches) {
            throw new Error(
                `${record.referenceId} ${record.version}: front matter sdk or major doesn't match the record`
            )
        }
        if (isMigration) migrations.set(sdk, { ...record, parsed })
        else bySdk.set(sdk, [...(bySdk.get(sdk) ?? []), { ...record, parsed }])
    }
    const manifest = []
    for (const [sdk, refs] of bySdk) {
        refs.sort((a, b) => Number(b.version) - Number(a.version))
        const majors = refs.map((r) => r.version)
        // The stable URL serves the newest released major. Newer, unreleased majors are experimental.
        const experimental = refs.filter((r) => r.parsed.meta.status === 'experimental').map((r) => r.version)
        const current = refs.find((r) => r.parsed.meta.status !== 'experimental') ?? refs[0]
        const latest = current.version
        const contents = path.join(siteDir, 'contents/docs/libraries', sdk)
        const raw = path.join(siteDir, 'static/docs/libraries', sdk)
        for (const ref of refs) {
            writeFile(
                path.join(contents, `${ref.version}.md`),
                page(ref.parsed, { sdk, major: ref.version, majors, latest, experimental, noindex: true })
            )
            writeFile(path.join(raw, `${ref.version}.md`), ref.markdown)
        }
        writeFile(
            path.join(contents, 'index.md'),
            page(current.parsed, { sdk, major: latest, majors, latest, experimental, noindex: false })
        )
        writeFile(`${raw}.md`, current.markdown)
        // The generated index replaces the hand-written library page on the same route.
        fs.rmSync(path.join(contents, 'index.mdx'), { force: true })
        const migration = migrations.get(sdk)
        if (migration) {
            const head = [
                '---',
                `title: ${JSON.stringify(migration.parsed.meta.title)}`,
                'sidebar: Docs',
                'showTitle: true',
                '---',
            ]
            writeFile(path.join(contents, 'migration.md'), `${head.join('\n')}\n\n${migration.parsed.body.trimStart()}`)
            writeFile(path.join(raw, 'migration.md'), migration.markdown)
        }
        manifest.push({
            sdk,
            referenceId: refs[0].referenceId,
            majors,
            latest,
            experimental,
            ...(migration ? { migration: true } : {}),
        })
    }
    writeFile(path.join(siteDir, MANIFEST), JSON.stringify(manifest, null, 2))
    return manifest
}

function readManifest(siteDir = process.cwd()) {
    const file = path.join(siteDir, MANIFEST)
    return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : []
}

/** Puts the stored Markdown back after the site's general HTML-to-Markdown export overwrote it. */
function publishRawReferences(siteDir = process.cwd()) {
    for (const { sdk, majors, migration } of readManifest(siteDir)) {
        for (const route of [sdk, ...majors.map((m) => `${sdk}/${m}`), ...(migration ? [`${sdk}/migration`] : [])]) {
            const source = path.join(siteDir, 'static/docs/libraries', `${route}.md`)
            writeFile(path.join(siteDir, 'public/docs/libraries', `${route}.md`), fs.readFileSync(source, 'utf8'))
        }
    }
}

/** True for an explicit major page, which stays out of the sitemap. */
function isVersionedReferencePath(pathname, manifest = readManifest()) {
    const trimmed = pathname.replace(/\/$/, '')
    return manifest.some(({ sdk, majors }) => majors.some((m) => trimmed === `/docs/libraries/${sdk}/${m}`))
}

module.exports = {
    materializeSdkReferences,
    publishRawReferences,
    readManifest,
    isVersionedReferencePath,
    tableOfContents,
}
